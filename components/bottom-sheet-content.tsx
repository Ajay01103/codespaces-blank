import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import React, { useState } from "react"
import { useBalanceStore } from "@/store/balance-store"
import { useTransactionStore } from "@/store/transaction-store"

const BottomSheetContent = () => {
  const [amount, setAmount] = useState("")

  const { addBalance } = useBalanceStore()
  const { addTransaction } = useTransactionStore()

  const handleAdd = () => {
    if (!amount) return

    const numericAmount = parseFloat(amount)
    if (isNaN(numericAmount)) return

    addBalance(numericAmount)

    // Create new transaction
    addTransaction({
      amount: numericAmount,
      type: "credit",
      description: "Added money to wallet",
    })

    setAmount("") // Reset the input after adding
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Money</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="#A1A1AA"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        selectionColor="#000"
      />

      <TouchableOpacity
        disabled={!amount}
        style={[styles.button, !amount && styles.buttonDisabled]}
        onPress={handleAdd}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    gap: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#18181B",
    marginBottom: 8,
  },
  input: {
    height: 56,
    backgroundColor: "#F4F4F5",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#18181B",
    borderWidth: 1,
    borderColor: "#E4E4E7",
  },
  button: {
    height: 50,
    backgroundColor: "#000",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  buttonDisabled: {
    backgroundColor: "#E5E7EB",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default BottomSheetContent
