import { View, Text, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import React from "react"

const Crypto = () => {
  const { top } = useSafeAreaInsets()

  return (
    <View style={styles.container}>
      <View style={[styles.content, { marginTop: top + 60 }]}>
        <Text>Crypto</Text>
      </View>
    </View>
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
})

export default Crypto
