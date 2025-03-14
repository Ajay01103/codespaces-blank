import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import React, { useEffect } from "react"
import { useAssets } from "expo-asset"
import { ResizeMode, Video } from "expo-av"
import { Link, useRouter } from "expo-router"
import { defaultStyles } from "@/constants/Styles"
import Colors from "@/constants/Colors"
import { useAuthStore } from "@/store/user-store"

const Page = () => {
  const [assets] = useAssets([require("@/assets/intro.mp4")])
  const router = useRouter()

  const { phoneNumber } = useAuthStore()

  useEffect(() => {
    // Add a small delay to ensure store is hydrated
    const checkAuth = setTimeout(() => {
      if (phoneNumber) {
        router.replace("/home")
      }
    }, 100)

    return () => clearTimeout(checkAuth)
  }, [phoneNumber, router])

  return (
    <View style={styles.container}>
      {assets && (
        <Video
          source={{ uri: assets[0].uri }}
          style={styles.video}
          resizeMode={ResizeMode.COVER}
          isMuted
          isLooping
          shouldPlay
        />
      )}

      <View style={{ marginTop: 80, padding: 20 }}>
        <Text style={styles.header}>Ready to change the way you money?</Text>
      </View>

      <View style={styles.buttons}>
        <Link
          href={"/login"}
          style={[defaultStyles.pillButton, { flex: 1, backgroundColor: Colors.dark }]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ color: "white", fontSize: 22, fontWeight: "500" }}>
              Log in
            </Text>
          </TouchableOpacity>
        </Link>
        <Link
          href={"/signup"}
          style={[defaultStyles.pillButton, { flex: 1, backgroundColor: "#fff" }]}
          asChild
        >
          <TouchableOpacity>
            <Text style={{ fontSize: 22, fontWeight: "500" }}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  video: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  header: {
    fontSize: 36,
    fontWeight: "900",
    textTransform: "uppercase",
    color: "white",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginBottom: 60,
    paddingHorizontal: 20,
  },
})

export default Page
