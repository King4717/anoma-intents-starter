
import { AdapterResult, Chain, Intent } from '../types'

// Mock adapters simulate execution and return deterministic "tx hashes".
const delay = (ms:number)=> new Promise(res=>setTimeout(res, ms))

async function simulateTx(tag: string): Promise<string> {
  await delay(600)
  const h = Math.random().toString(16).slice(2, 10)
  return `0x${tag}_${h}`
}

export async function executeOnAdapter(intent: Intent, chain: Chain): Promise<AdapterResult> {
  // simulate different behavior per chain
  try {
    const txHash = await simulateTx(chain)
    return { ok: true, txHash, simulated: true }
  } catch (e:any) {
    return { ok: false, error: e?.message || 'adapter error' }
  }
}
