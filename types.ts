
export type Chain = 'ethereum' | 'osmosis' | 'solana' | 'anoma-sim'

export type IntentKind = 'swap' | 'bridge' | 'nft-mint'

export interface Intent {
  id: string
  createdAt: number
  kind: IntentKind
  user: string
  details: Record<string, unknown>
  constraints?: {
    maxSlippageBps?: number
    deadline?: number
    feeLimit?: string
    privacy?: 'public' | 'shielded'
  }
  status: 'draft' | 'submitted' | 'matched' | 'executed' | 'failed'
  route?: {
    adapter: Chain
    steps: Array<{ adapter: Chain; action: string; payload: Record<string, unknown> }>
  }
}

export interface AdapterResult {
  ok: boolean
  txHash?: string
  error?: string
  simulated?: boolean
}
