import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Pressable,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import React, { useState } from "react"
import { LineChart } from "react-native-gifted-charts"

const CRYPTO_LIST = [
  {
    id: "1",
    name: "Bitcoin",
    symbol: "BTC",
    price: "43,567.89",
    change: "+2.34%",
    isPositive: true,
    image: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    price: "2,345.67",
    change: "-1.23%",
    isPositive: false,
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    id: "3",
    name: "Solana",
    symbol: "SOL",
    price: "98.76",
    change: "+4.56%",
    isPositive: true,
    image: "https://cryptologos.cc/logos/solana-sol-logo.png",
  },
  {
    id: "4",
    name: "Cardano",
    symbol: "ADA",
    price: "1.23",
    change: "+3.45%",
    isPositive: true,
    image: "https://cryptologos.cc/logos/cardano-ada-logo.png",
  },
]

const generateRandomData = () => {
  const data = []
  const basePrice = 22000
  const volatility = 12000
  const amplitude = 4000 // Controls how far price can deviate from base

  for (let i = 0; i < 24; i++) {
    // Create oscillating pattern around base price
    const change = (Math.random() - 0.5) * volatility
    const trendBias = Math.sin(i / 6) * amplitude
    const price = basePrice + change + trendBias

    // Keep price within a narrower range around base price
    data.push({
      value: Math.max(basePrice - amplitude, Math.min(basePrice + amplitude, price)),
      dataPointText: i === 23 ? "$" + price.toFixed(0) : "",
    })
  }
  return data
}

const { width } = Dimensions.get("window")

const Invest = () => {
  const { top } = useSafeAreaInsets()
  const [selectedTimeframe, setSelectedTimeframe] = useState("1D")
  const [selectedCrypto, setSelectedCrypto] = useState(CRYPTO_LIST[0]) // Default to Bitcoin

  const data = generateRandomData()
  const latestPrice = data[data.length - 1].value

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[styles.container, { paddingTop: top + 20 }]}
      contentContainerStyle={styles.scrollContent} // Add this line
    >
      <View style={styles.header}>
        <View style={styles.cryptoHeader}>
          <Image
            source={{ uri: selectedCrypto.image }}
            style={styles.headerImage}
            resizeMode="contain"
          />
          <Text style={styles.title}>{selectedCrypto.name}</Text>
        </View>
        <Text style={styles.price}>${selectedCrypto.price}</Text>
        <Text
          style={[
            styles.change,
            { color: selectedCrypto.isPositive ? "#10B981" : "#EF4444" },
          ]}
        >
          {selectedCrypto.change}
        </Text>
      </View>

      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          height={250}
          width={width - 32}
          hideDataPoints
          thickness={2}
          color="#10B981"
          startFillColor="rgba(16, 185, 129, 0.2)"
          endFillColor="rgba(16, 185, 129, 0.0)"
          initialSpacing={6}
          endSpacing={6}
          spacing={width / data.length}
          backgroundColor="#fff"
          xAxisColor="transparent"
          yAxisColor="transparent"
          yAxisTextStyle={styles.yAxisText}
          xAxisLabelTextStyle={styles.xAxisText}
          rulesColor="#F3F4F6"
          rulesType="solid"
          // yAxisTextNumberOfLines={1}
          curved
        />
      </View>

      <View style={styles.timeframes}>
        {["1H", "1D", "1W", "1M", "1Y", "ALL"].map((timeframe) => (
          <Text
            key={timeframe}
            style={[
              styles.timeframeButton,
              timeframe === selectedTimeframe && styles.activeTimeframe,
            ]}
            onPress={() => setSelectedTimeframe(timeframe)}
          >
            {timeframe}
          </Text>
        ))}
      </View>

      <View>
        <Text style={styles.sectionTitle}>Popular Cryptocurrencies</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cryptoList}
        >
          {CRYPTO_LIST.map((crypto) => (
            <Pressable
              key={crypto.id}
              style={[
                styles.cryptoCard,
                selectedCrypto.id === crypto.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedCrypto(crypto)}
            >
              <View style={styles.cryptoHeader}>
                <Image
                  source={{ uri: crypto.image }}
                  style={styles.cryptoImage}
                  resizeMode="contain"
                />
                <View style={styles.cryptoInfo}>
                  <Text style={styles.cryptoName}>{crypto.name}</Text>
                  <Text style={styles.cryptoSymbol}>{crypto.symbol}</Text>
                </View>
              </View>
              <View style={styles.cryptoDetails}>
                <Text style={styles.cryptoPrice}>${crypto.price}</Text>
                <Text
                  style={[
                    styles.cryptoChange,
                    { color: crypto.isPositive ? "#10B981" : "#EF4444" },
                  ]}
                >
                  {crypto.change}
                </Text>
              </View>
            </Pressable>
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
    paddingHorizontal: 14,
  },
  scrollContent: {
    paddingBottom: 108, // Add bottom padding for better scrolling
    minHeight: "100%", // Ensure content is scrollable
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  price: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  change: {
    fontSize: 16,
    color: "#10B981",
    fontWeight: "500",
  },
  chartContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    overflow: "hidden",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  timeframes: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  timeframeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  activeTimeframe: {
    backgroundColor: "#F3F4F6",
    color: "#1F2937",
  },
  yAxisText: {
    color: "#6B7280",
    fontSize: 12,
  },
  xAxisText: {
    color: "#6B7280",
    fontSize: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
    marginTop: 24,
    marginBottom: 16,
  },
  cryptoList: {
    paddingLeft: 16,
    paddingRight: 26,
    gap: 14,
  },
  cryptoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    width: width * 0.7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 8,
  },
  cryptoHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  cryptoImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  cryptoInfo: {
    flex: 1,
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
  cryptoDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cryptoPrice: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1F2937",
  },
  cryptoChange: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  selectedCard: {
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#FEFEFE",
  },
})

export default Invest
