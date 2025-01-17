import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { isStale } from '@/lib/rateChecker'

interface RatesStore {
  rates: Record<string, number>;
  lastUpdated: number | null;
  isLoading: boolean;
  error: string | null;
  setRates: (rates: Record<string, number>) => void;
  fetchRatesIfStale: () => Promise<void>;
}

export const useRatesStore = create<RatesStore>()(
  persist(
    (set, get) => ({
      rates: {},
      lastUpdated: null,
      isLoading: false,
      error: null,
      setRates: (rates) => set({ rates, lastUpdated: Date.now() }),
      fetchRatesIfStale: async () => {
        const { lastUpdated } = get();
        
        if (!isStale(lastUpdated)) {
          return;
        }

        try {
          set({ isLoading: true, error: null });
          const response = await fetch('https://open.er-api.com/v6/latest/CAD');
          const data = await response.json();
          set({ 
            rates: data.rates, 
            lastUpdated: Date.now(), 
            isLoading: false 
          });
        } catch (error) {
          set({ 
            error: `Failed to fetch rates, ${error}`, 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'exchange-rates',
      partialize: (state) => ({ 
        rates: state.rates, 
        lastUpdated: state.lastUpdated 
      }),
    }
  )
);