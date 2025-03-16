import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface Transaction {
  id: string
  amount: number
  type: "credit" | "debit"
  date: string
  description?: string
}

interface TransactionStore {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id" | "date">) => void
  removeTransaction: (id: string) => void
  clearTransactions: () => void
}

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            ...state.transactions,
            {
              ...transaction,
              id: Math.random().toString(36).substring(7),
              date: new Date().toISOString(),
            },
          ],
        })),

      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((transaction) => transaction.id !== id),
        })),

      clearTransactions: () => set({ transactions: [] }),
    }),
    {
      name: "transactions-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)
