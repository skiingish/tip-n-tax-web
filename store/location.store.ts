import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Provinces } from '@/types/types'

interface LocationState {
  province: Provinces
  setProvince: (province: Provinces) => void
}

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      province: 'British Columbia',
      setProvince: (province) => set({ province }),
    }),
    {
      name: 'location-province',
    },
  )
)