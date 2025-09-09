
import { create } from 'zustand'
import { Intent } from './types'

interface State {
  user: string
  intents: Intent[]
  addIntent: (i: Intent) => void
  updateIntent: (id: string, update: Partial<Intent>) => void
  clear: () => void
}

export const useApp = create<State>((set) => ({
  user: 'mage_' + Math.random().toString(36).slice(2, 6),
  intents: [],
  addIntent: (i) => set((s) => ({ intents: [i, ...s.intents] })),
  updateIntent: (id, update) => set((s) => ({
    intents: s.intents.map(it => it.id === id ? { ...it, ...update } : it)
  })),
  clear: () => set({ intents: [] })
}))
