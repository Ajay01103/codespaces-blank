import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import React from "react"
import { useAuthStore } from "@/store/user-store"
import { defaultStyles } from "@/constants/Styles"
import Colors from "@/constants/Colors"
import { useBalanceStore } from "@/store/balance-store"
import RoundBtn from "@/components/RoundBtn"

const Home = () => {
  const { top } = useSafeAreaInsets()

  const { phoneNumber } = useAuthStore()
  const { balance } = useBalanceStore()

  return (
    <ScrollView style={styles.container}>
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
            // onPress={onAddMoney}
          />
          <RoundBtn
            icon={"refresh"}
            text={"Exchange"}
            // onPress={clearTransactions}
          />
          <RoundBtn
            icon={"list"}
            text={"Details"}
          />
          {/* <Dropdown /> */}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
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
    marginHorizontal: 20,
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 16,
    gap: 20,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default Home
