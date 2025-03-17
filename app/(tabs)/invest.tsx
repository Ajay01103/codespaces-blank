import { View, Text, StyleSheet, Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import React from "react"
import { CartesianChart, Line } from "victory-native"
import { Circle } from "@shopify/react-native-skia"
import { useChartPressState } from "victory-native"
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated"

const bitcoinData = Array.from({ length: 30 }, (_, i) => ({
  x: i,
  price: 45000 + Math.random() * 6000,
}))

const { width } = Dimensions.get("window")

const Invest = () => {
  const { top } = useSafeAreaInsets()
  const { state, isActive } = useChartPressState({
    x: 0,
    y: { price: bitcoinData[0].price },
  })

  return (
    <View style={[styles.container, { marginTop: top + 20 }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Bitcoin</Text>
        <Animated.Text style={styles.price}>
          ${isActive ? state.y.price.value.value.toFixed(2) : "51,000.00"}
        </Animated.Text>
        <Text style={styles.change}>+2.5% (24h)</Text>
      </View>

      <View style={styles.chartContainer}>
        <CartesianChart
          data={bitcoinData}
          xKey="x"
          yKeys={["price"]}
          domain={{ x: [0, 29], y: [42000, 52000] }}
          // style={{ width: width - 32, height: 300 }}
          padding={{ top: 20, bottom: 40, left: 40, right: 20 }}
          chartPressState={state}
          axisOptions={{
            tickCount: { x: 5, y: 5 },
            formatXLabel: (x) => `${x}d`,
            formatYLabel: (y) => `$${(y / 1000).toFixed(1)}k`,
          }}
        >
          {({ points }) => (
            <>
              <Line
                points={points.price}
                color="#10B981"
                strokeWidth={3}
                animate={{
                  type: "spring",
                  duration: 300,
                }}
              />
              {isActive && (
                <Circle
                  cx={state.x.position}
                  cy={state.y.price.position}
                  r={6}
                  color="#10B981"
                />
              )}
            </>
          )}
        </CartesianChart>
      </View>

      <View style={styles.timeframes}>
        {["1D", "1W", "1M", "3M", "1Y", "ALL"].map((timeframe) => (
          <Text
            key={timeframe}
            style={[styles.timeframeButton, timeframe === "1M" && styles.activeTimeframe]}
          >
            {timeframe}
          </Text>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
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
  // chartContainer: {
  //   marginVertical: 20,
  //   backgroundColor: "#fff",
  //   borderRadius: 16,
  //   padding: 16,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.1,
  //   shadowRadius: 8,
  //   elevation: 3,
  // },
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
  chartContainer: {
    height: 300, // Fixed height
    backgroundColor: "#fff",
    borderRadius: 16,
    marginVertical: 20,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
})

export default Invest
