import React, { useRef } from "react"
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from "react-native"
import { Feather } from "@expo/vector-icons"
import RoundBtn from "./RoundBtn"
import Animated, {
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  FadeIn,
  FadeOut,
} from "react-native-reanimated"

const DropdownMenu = () => {
  const [visible, setVisible] = React.useState(false)
  const translateY = useSharedValue(-10)

  const menuItems: Array<{
    id: number
    label: string
    icon: keyof typeof Feather.glyphMap
  }> = [
    { id: 1, label: "Profile", icon: "user" },
    { id: 2, label: "Settings", icon: "settings" },
    { id: 3, label: "Help", icon: "help-circle" },
    { id: 4, label: "Logout", icon: "log-out" },
  ]

  const showMenu = () => {
    setVisible(true)
    translateY.value = withSpring(0, {
      mass: 0.3,
      damping: 15,
    })
  }

  const hideMenu = () => {
    translateY.value = withSpring(-10, {
      mass: 0.3,
      damping: 15,
    })
    setTimeout(() => setVisible(false), 100)
  }

  const menuAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }))

  return (
    <View style={styles.container}>
      <RoundBtn
        icon={"ellipsis-horizontal"}
        text={"More"}
        onPress={showMenu}
      />

      {visible && (
        <Pressable
          style={styles.overlay}
          onPress={(event) => {
            // Only hide if clicking the overlay itself
            if (event.target === event.currentTarget) {
              hideMenu()
            }
          }}
        >
          <Animated.View
            entering={FadeIn.duration(150)}
            exiting={FadeOut.duration(100)}
            style={[styles.dropdownContent, menuAnimatedStyle]}
          >
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => {
                  console.log(`Selected: ${item.label}`)
                  hideMenu()
                }}
              >
                <Feather
                  name={item.icon}
                  size={18}
                  color="#4B5563"
                />
                <Text style={styles.menuText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </Pressable>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 1000,
  },
  dropdownContent: {
    position: "absolute",
    top: 50,
    right: 0,
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
    borderRadius: 8,
    backgroundColor: "transparent",
  },
  menuText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1F2937",
  },
})

export default DropdownMenu
