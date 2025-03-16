import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import React, { useCallback, useRef } from "react"
import { useAuthStore } from "@/store/user-store"
import { defaultStyles } from "@/constants/Styles"
import Colors from "@/constants/Colors"
import { useBalanceStore } from "@/store/balance-store"
import RoundBtn from "@/components/RoundBtn"
import Dropdown from "@/components/dropdown"
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet"
import BottomSheetContent from "@/components/bottom-sheet-content"
import { useTransactionStore } from "@/store/transaction-store"
import { Ionicons } from "@expo/vector-icons"
import { format } from "date-fns"
import WidgetList from "@/components/sortableList/widget-list"

const Home = () => {
  const { top } = useSafeAreaInsets()

  const snapPoints = React.useMemo(() => ["50%"], [])

  const { phoneNumber } = useAuthStore()
  const { balance } = useBalanceStore()
  const { transactions } = useTransactionStore()

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present()
  }, [])
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index)
  }, [])

  const handleSuccess = useCallback(() => {
    // Close the bottom sheet
    bottomSheetModalRef.current?.dismiss()
    // Dismiss keyboard if it's open
    Keyboard.dismiss()
  }, [])

  // Get latest 5 transactions sorted by date
  const latestTransactions = transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent} // Add this
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.content, { marginTop: top + 60 }]}>
          <View style={styles.account}>
            <View style={styles.row}>
              <Text style={styles.balance}>{balance}</Text>
              <Text style={styles.currency}>$</Text>
            </View>
            <TouchableOpacity
              style={[
                defaultStyles.pillButtonSmall,
                { backgroundColor: Colors.lightGray, marginVertical: 20 },
              ]}
            >
              <Text style={[defaultStyles.buttonTextSmall, { color: Colors.dark }]}>
                Accounts
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.actionRow}>
            <RoundBtn
              icon={"add"}
              text={"Add money"}
              onPress={handlePresentModalPress}
              // onPress={onAddMoney}
            />
            <RoundBtn
              icon={"refresh"}
              text={"Exchange"}
              // onPress={clearTransactions}
            />
            <RoundBtn
              icon={"card"}
              text={"Accounts"}
            />
            <Dropdown />
          </View>

          <Text style={defaultStyles.sectionHeader}>Transactions</Text>
          <View style={styles.transactions}>
            {transactions.length === 0 && (
              <Text style={{ padding: 14, color: Colors.gray }}>No transactions yet</Text>
            )}

            {latestTransactions.map((transaction) => (
              <View
                key={transaction.id}
                style={styles.transactionItem}
              >
                <View style={styles.circle}>
                  <Ionicons
                    name={transaction.amount > 0 ? "add" : "remove"}
                    size={24}
                    color={Colors.dark}
                  />
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "400" }}>{transaction.description}</Text>
                  <Text style={{ color: Colors.gray, fontSize: 12 }}>
                    {format(new Date(transaction.date), "MMM dd, yyyy • HH:mm")}
                  </Text>
                </View>
                <Text>{transaction.amount}$</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={defaultStyles.sectionHeader}>Widgets</Text>
        <WidgetList />

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={styles.bottomSheet}
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}
          keyboardBehavior="interactive"
          keyboardBlurBehavior="restore"
          android_keyboardInputMode="adjustResize"
        >
          <BottomSheetView style={styles.contentContainer}>
            <BottomSheetContent />

            {/* Add your bottom sheet content here */}
          </BottomSheetView>
        </BottomSheetModal>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40, // Add bottom padding for better scrolling
  },
  account: {
    margin: 80,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
  },
  balance: {
    fontSize: 50,
    fontWeight: "bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  transactions: {
    marginHorizontal: 14,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
    marginBottom: 20, // Add margin bottom
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    // paddingVertical: 8, // Add vertical padding
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
  // contentContainer: {
  //   flex: 1,
  //   alignItems: "center",
  //   padding: 20,
  // },
  // bottomSheetTitle: {
  //   fontSize: 20,
  //   fontWeight: "600",
  //   marginBottom: 20,
  // },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    borderColor: "#DBD7D7",
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  bottomSheetIndicator: {
    backgroundColor: "#DBD7D7",
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  bottomSheetHeader: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 8,
  },
  bottomSheetHeaderLine: {
    width: 40,
    height: 4,
    backgroundColor: "#DEDEDE",
    borderRadius: 2,
    marginBottom: 8,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    textAlign: "center",
  },
  contentContainer: {
    flex: 1,
  },
})

export default Home
