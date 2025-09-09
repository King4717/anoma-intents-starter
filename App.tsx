
import React, { useMemo, useState } from 'react'
import { useApp } from '../store'
import { Intent, IntentKind } from '../types'
import { planRoute, executeRoute } from '../engine/router'
import { IntentCard } from './components/IntentCard'
import { NewIntentForm } from './components/NewIntentForm'

export const App: React.FC = () => {
  const { user, intents, addIntent, updateIntent, clear } = useApp()
  const [submitting, setSubmitting] = useState(false)

  const onCreate = (i: Omit<Intent, 'id' | 'createdAt' | 'status' | 'route' | 'user'>) => {
    const id = crypto.randomUUID()
    const createdAt = Date.now()
    const base: Intent = { id, createdAt, status: 'draft', user, ...i }
    base.route = planRoute(base)
    addIntent(base)
  }

  const onSubmit = async (id: string) => {
    setSubmitting(true)
    updateIntent(id, { status: 'submitted' })
    const intent = intents.find(i => i.id === id)!
    const res = await executeRoute(intent)
    if (res.ok) updateIntent(id, { status: 'executed', details: { ...intent.details, txHashes: res.hashes } })
    else updateIntent(id, { status: 'failed', details: { ...intent.details, error: res.error } })
    setSubmitting(false)
  }

  return (
    <div style={{ fontFamily: 'Inter, ui-sans-serif, system-ui', padding: 16, maxWidth: 980, margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: 24 }}>🔮 Anoma Intents — Demo</h1>
        <div>
          <span style={{ fontSize: 14, opacity: 0.8 }}>User:</span> <b>{user}</b>
        </div>
      </header>

      <section style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr' }}>
        <NewIntentForm onCreate={onCreate} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18 }}>🗂️ Intents</h2>
          <button onClick={clear} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #ddd' }}>Clear</button>
        </div>
        {intents.length === 0 && <p>No intents yet — create one above.</p>}
        {intents.map(i => (
          <IntentCard key={i.id} intent={i} onSubmit={() => onSubmit(i.id)} submitting={submitting} />
        ))}
      </section>

      <footer style={{ marginTop: 32, fontSize: 12, opacity: 0.8 }}>
        <p>This is a prototype to illustrate intent-centric UX and multi-chain routing. Adapters are simulated.</p>
      </footer>
    </div>
  )
}
