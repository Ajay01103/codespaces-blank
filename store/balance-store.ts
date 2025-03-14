import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface BalanceState {
  balance: number
  currency: string
  setBalance: (amount: number) => void
  addBalance: (amount: number) => void
  subtractBalance: (amount: number) => void
  setCurrency: (currency: string) => void
}

export const useBalanceStore = create<BalanceState>()(
  persist(
    (set) => ({
      balance: 0,
      currency: "USD",
      setBalance: (amount) => set({ balance: amount }),
      addBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
      subtractBalance: (amount) => set((state) => ({ balance: state.balance - amount })),
      setCurrency: (currency) => set({ currency }),
    }),
    {
      name: "balance-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
