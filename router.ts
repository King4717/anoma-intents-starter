
import { Intent, Chain } from '../types'
import { executeOnAdapter } from './adapters'

export function planRoute(intent: Intent): Intent['route'] {
  // Simple static router: pick chain by kind, add multi-step for bridge
  if (intent.kind === 'bridge') {
    return {
      adapter: 'anoma-sim',
      steps: [
        { adapter: 'ethereum', action: 'lock', payload: { amount: intent.details.amount } },
        { adapter: 'anoma-sim', action: 'match-intent', payload: { privacy: intent.constraints?.privacy || 'public' } },
        { adapter: 'osmosis', action: 'mint', payload: { denom: intent.details.targetAsset } },
      ],
    }
  }
  if (intent.kind === 'swap') {
    return {
      adapter: 'anoma-sim',
      steps: [
        { adapter: 'anoma-sim', action: 'match-intent', payload: { pair: intent.details.pair } },
        { adapter: 'osmosis', action: 'swap', payload: { slippage: intent.constraints?.maxSlippageBps || 50 } },
      ],
    }
  }
  // nft-mint
  return {
    adapter: 'anoma-sim',
    steps: [
      { adapter: 'anoma-sim', action: 'allocate-royalty', payload: { pct: 5 } },
      { adapter: 'solana', action: 'mint-nft', payload: { name: intent.details.name } },
    ],
  }
}

export async function executeRoute(intent: Intent): Promise<{ ok: boolean; hashes: string[]; error?: string }> {
  const plan = intent.route || planRoute(intent)
  const hashes: string[] = []
  for (const step of plan.steps) {
    const res = await executeOnAdapter(intent, step.adapter as Chain)
    if (!res.ok) return { ok: false, hashes, error: res.error }
    hashes.push(res.txHash!)
  }
  return { ok: true, hashes }
}
