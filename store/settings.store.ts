import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CurrencyCode } from '@/types/types'

interface SettingsState {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      currency: 'AUD',
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: 'settings-storage',
    }
  )
)