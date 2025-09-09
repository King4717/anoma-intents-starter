
# 🔮 Anoma Intents — Starter (Frontend Prototype)

A lightweight, GitHub-ready **intent-centric** demo that showcases:
- **Intent Builder UX** (swap / bridge / NFT mint)
- **Mock Intent Router** that plans multi-chain steps
- **Adapters** that simulate execution and produce mock tx hashes
- **Privacy flag** (public or shielded) + constraints (slippage, deadline)

> This is a **prototype** to demonstrate architecture & UX for Anoma Intents Tuesday submissions.
> It does not connect to real networks; adapters are simulated to keep setup simple for reviewers.

## 🧱 Architecture
- `src/ui/*`: Presentation layer (React)
- `src/engine/router.ts`: Creates a **route plan** from a high-level intent
- `src/engine/adapters.ts`: Mock multi-chain **adapters** (ethereum/osmosis/solana/anoma-sim)
- `src/types.ts`: Intent schema & types
- `src/store.ts`: Local state (Zustand)

### Intent Schema (simplified)
```ts
type Intent = {
  id: string
  createdAt: number
  kind: 'swap' | 'bridge' | 'nft-mint'
  user: string
  details: Record<string, unknown>
  constraints?: {
    maxSlippageBps?: number
    deadline?: number
    feeLimit?: string
    privacy?: 'public' | 'shielded'
  }
  status: 'draft' | 'submitted' | 'matched' | 'executed' | 'failed'
  route?: { adapter: Chain; steps: Array<{ adapter: Chain; action: string; payload: Record<string, unknown> }> }
}
```

## 🚀 Run locally
```bash
npm install
npm run dev
```
Open the shown local URL (default `http://localhost:5173`).

## 🧪 Demo flow
1. Pick an **intent type** (Swap / Bridge / NFT Mint)
2. Fill minimal fields and set **privacy** + **slippage**
3. Click **Add Intent** → router plans a route
4. Click **Submit & Simulate** → adapters execute steps and return mock tx hashes

## 🧭 Why this is intent-centric?
- Users express **what** they want (swap X for Y, bridge to Z), not **how**.
- A router **plans** the how (multi-chain steps + adapters).
- Constraints let users set guardrails; the system **anticipates** routes (e.g., add shielded matching step).

## 🌉 Multi-chain compatibility
The router composes steps across different mock chains:
- Swap: `anoma-sim.match-intent` → `osmosis.swap`
- Bridge: `ethereum.lock` → `anoma-sim.match-intent` → `osmosis.mint`
- NFT: `anoma-sim.allocate-royalty` → `solana.mint-nft`

You can extend `engine/adapters.ts` to call real SDKs later.

## 🔐 Privacy
Toggle **public/shielded** in the form. The router includes a privacy-aware `match-intent` step.

## 📝 Submission checklist
- [x] Clear README (this file)
- [x] Frontend demo shows **intent functionality**
- [x] Multi-chain + privacy showcased in route plan
- [x] 5–7 message presentation script (see `docs/PRESENTATION.md`)

## 📄 License
MIT — feel free to fork and build further.
