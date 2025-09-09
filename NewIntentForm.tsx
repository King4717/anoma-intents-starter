
import React, { useState } from 'react'
import { Intent, IntentKind } from '../../types'

export const NewIntentForm: React.FC<{ onCreate: (i: Omit<Intent, 'id'|'createdAt'|'status'|'route'|'user'>) => void }> = ({ onCreate }) => {
  const [kind, setKind] = useState<IntentKind>('swap')
  const [pair, setPair] = useState('ATOM/OSMO')
  const [amount, setAmount] = useState('10')
  const [targetAsset, setTargetAsset] = useState('OSMO')
  const [nftName, setNftName] = useState('Mage Badge')
  const [slippage, setSlippage] = useState(50)
  const [privacy, setPrivacy] = useState<'public'|'shielded'>('public')

  const buildDetails = () => {
    if (kind === 'swap') return { pair, amount }
    if (kind === 'bridge') return { amount, targetAsset }
    return { name: nftName }
  }

  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: 16 }}>
      <h2 style={{ fontSize: 18, marginBottom: 8 }}>Create Intent</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <label>Kind
          <select value={kind} onChange={(e)=>setKind(e.target.value as IntentKind)} style={sel()}>
            <option value="swap">Swap</option>
            <option value="bridge">Bridge</option>
            <option value="nft-mint">NFT Mint</option>
          </select>
        </label>

        <label>Privacy
          <select value={privacy} onChange={(e)=>setPrivacy(e.target.value as any)} style={sel()}>
            <option value="public">Public</option>
            <option value="shielded">Shielded</option>
          </select>
        </label>

        {kind === 'swap' && (<>
          <label>Pair <input value={pair} onChange={e=>setPair(e.target.value)} style={inp()} /></label>
          <label>Amount <input value={amount} onChange={e=>setAmount(e.target.value)} style={inp()} /></label>
        </>)}

        {kind === 'bridge' && (<>
          <label>Amount <input value={amount} onChange={e=>setAmount(e.target.value)} style={inp()} /></label>
          <label>Target Asset <input value={targetAsset} onChange={e=>setTargetAsset(e.target.value)} style={inp()} /></label>
        </>)}

        {kind === 'nft-mint' && (<>
          <label>NFT Name <input value={nftName} onChange={e=>setNftName(e.target.value)} style={inp()} /></label>
          <div></div>
        </>)}

        <label>Max Slippage (bps) <input type="number" value={slippage} onChange={e=>setSlippage(parseInt(e.target.value))} style={inp()} /></label>
      </div>

      <button
        onClick={()=> onCreate({
          kind,
          user: 'demo',
          details: buildDetails(),
          constraints: { maxSlippageBps: slippage, privacy },
          status: 'draft'
        } as any)}
        style={{ marginTop: 12, padding: '10px 14px', borderRadius: 10, border: '1px solid #ddd', background: '#ECFEFF' }}
      >
        Add Intent
      </button>
    </div>
  )
}

const inp = () => ({ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' })
const sel = () => ({ width: '100%', padding: 8, borderRadius: 8, border: '1px solid #e5e7eb' })
