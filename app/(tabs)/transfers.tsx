import { View, Text, StyleSheet, ScrollView, Image, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import React, { useState } from "react"
import { format } from "date-fns"
import { Feather } from "@expo/vector-icons"
import { Transaction, useTransactionStore } from "@/store/transaction-store"

const ITEMS_PER_PAGE = 10

const Transfers = () => {
  const { top } = useSafeAreaInsets()
  const transactions: Transaction[] = useTransactionStore(
    (state: { transactions: Transaction[] }) => state.transactions
  )
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)

  const loadMore = () => {
    setDisplayCount((prev) => prev + ITEMS_PER_PAGE)
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: top + 20 }]}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent} // Add this line
    >
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <Text style={styles.subtitle}>View your payment history</Text>
      </View>

      <View style={styles.transactionList}>
        {transactions.slice(0, displayCount).map((transaction: Transaction) => (
          <View
            key={transaction.id}
            style={styles.transactionCard}
          >
            <View style={styles.iconContainer}>
              <Feather
                name={
                  transaction.type === "credit" ? "arrow-down-left" : "arrow-up-right"
                }
                size={24}
                color={transaction.type === "credit" ? "#10B981" : "#EF4444"}
              />
            </View>

            <View style={styles.transactionInfo}>
              <Text style={styles.transactionName}>{transaction.description}</Text>
              <Text style={styles.transactionDate}>
                {format(new Date(transaction.date), "MMM dd, yyyy • HH:mm")}
              </Text>
            </View>

            <View style={styles.amountContainer}>
              <Text
                style={[
                  styles.amount,
                  { color: transaction.type === "credit" ? "#10B981" : "#EF4444" },
                ]}
              >
                {transaction.type === "credit" ? "+" : "-"}${transaction.amount}
              </Text>
              <Text style={styles.status}>{transaction.status}</Text>
            </View>
          </View>
        ))}

        {displayCount < transactions.length && (
          <Pressable
            style={styles.loadMoreButton}
            onPress={loadMore}
          >
            <Text style={styles.loadMoreText}>Load More</Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingBottom: 100, // Add extra padding at the bottom
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  transactionList: {
    gap: 12,
    paddingBottom: 12,
  },
  transactionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 14,
    color: "#6B7280",
  },
  amountContainer: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  status: {
    fontSize: 12,
    color: "#6B7280",
    textTransform: "capitalize",
  },
  loadMoreButton: {
    padding: 16,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 24,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4B5563",
  },
})

export default Transfers
