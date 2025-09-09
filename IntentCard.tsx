
import React from 'react'
import { Intent } from '../../types'

export const IntentCard: React.FC<{ intent: Intent; onSubmit: () => void; submitting: boolean }> = ({ intent, onSubmit, submitting }) => {
  const created = new Date(intent.createdAt).toLocaleString()
  return (
    <div style={{ border: '1px solid #e5e7eb', borderRadius: 16, padding: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 14, opacity: 0.7 }}>#{intent.id.slice(0, 8)} • {created}</div>
          <h3 style={{ margin: '6px 0' }}>{intent.kind.toUpperCase()}</h3>
        </div>
        <span style={{ padding: '4px 8px', borderRadius: 999, background: badgeColor(intent.status), color: '#111', fontSize: 12 }}>{intent.status}</span>
      </div>
      <pre style={{ background: '#f9fafb', padding: 12, borderRadius: 12, marginTop: 10, overflowX: 'auto' }}>{JSON.stringify({ details: intent.details, constraints: intent.constraints, route: intent.route }, null, 2)}</pre>
      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
        <button disabled={submitting || intent.status === 'executed'} onClick={onSubmit} style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid #ddd', background: '#EEF2FF' }}>Submit & Simulate</button>
      </div>
    </div>
  )
}

function badgeColor(status: string) {
  switch (status) {
    case 'draft': return '#E5E7EB'
    case 'submitted': return '#FEF9C3'
    case 'matched': return '#D1FAE5'
    case 'executed': return '#BBF7D0'
    case 'failed': return '#FECACA'
    default: return '#E5E7EB'
  }
}
