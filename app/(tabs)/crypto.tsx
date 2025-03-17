import { View, Text, StyleSheet, ScrollView, Dimensions, Image } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import React from "react"
import { defaultStyles } from "@/constants/Styles"

const POPULAR_CRYPTO = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    price: "43,567.89",
    change: "+2.34%",
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    price: "2,345.67",
    change: "+1.23%",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    id: "3",
    name: "Tether",
    symbol: "USDT",
    price: "97.885",
    change: "+1.73%",
    image: "https://cryptologos.cc/logos/tether-usdt-logo.png",
  },
  {
    id: "4",
    name: "Solana",
    symbol: "SOL",
    price: "98.76",
    change: "+4.56%",
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    id: "5",
    name: "Litecoin",
    symbol: "LTC",
    price: "97.26",
    change: "+6.56%",
    image: "https://cryptologos.cc/logos/litecoin-ltc-logo.png",
  },
  {
    id: "6",
    name: "Dodge Coin",
    symbol: "DGC",
    price: "0.2409",
    change: "-2.81%",
    image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
  },
]
const { width } = Dimensions.get("window")
const CARD_WIDTH = width * 0.8

const Crypto = () => {
  const { top } = useSafeAreaInsets()

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.content, { marginTop: top + 60, marginBottom: 56 }]}>
        <Text style={defaultStyles.sectionHeader}>Latest Crypot</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.cryptoList}
        >
          {POPULAR_CRYPTO.map((crypto) => (
            <View
              key={crypto.id}
              style={styles.card}
            >
              <View style={styles.cardHeader}>
                <Image
                  source={{ uri: crypto.image }}
                  style={styles.cryptoImage}
                />
                <View>
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                  <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
                </View>
              </View>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>${crypto.price}</Text>
                <Text
                  style={[
                    styles.change,
                    { color: crypto.change.startsWith("+") ? "#10B981" : "#EF4444" },
                  ]}
                >
                  {crypto.change}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
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
  cryptoList: {
    paddingVertical: 20,
    gap: 15,
    paddingRight: 14,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    marginLeft: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  cryptoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cryptoName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  cryptoSymbol: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
  },
  change: {
    fontSize: 16,
    fontWeight: "600",
  },
})

export default Crypto
