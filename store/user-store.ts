import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import AsyncStorage from "@react-native-async-storage/async-storage"

interface AuthState {
  phoneNumber: string | null
  countryCode: string
  isInitialized: boolean
  setPhoneNumber: (phone: string | null) => void
  setCountryCode: (code: string) => void
  clearAuth: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      phoneNumber: null,
      countryCode: "+91",
      isInitialized: false,
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      setCountryCode: (code) => set({ countryCode: code }),
      clearAuth: () => set({ phoneNumber: null, countryCode: "+91" }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => (state) => {
        state?.setPhoneNumber(state.phoneNumber || null)
      },
    }
  )
)
