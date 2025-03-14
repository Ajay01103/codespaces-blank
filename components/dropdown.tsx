import React from "react"
import { StyleSheet, View, Text, Pressable, Modal, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import RoundBtn from "./RoundBtn"

const DropdownMenu = () => {
  const [visible, setVisible] = React.useState(false)
  const buttonRef = React.useRef(null)

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

  return (
    <View style={styles.container}>
      {/* <Pressable
        style={styles.trigger}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.triggerText}>Menu</Text>
        <Feather
          name="chevron-down"
          size={18}
          color="#000"
        />
      </Pressable> */}

      <RoundBtn
        icon={"ellipsis-horizontal"}
        text={"More"}
        onPress={() => setVisible(true)}
      />

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.dropdownContent}>
            {menuItems.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => {
                  console.log(`Selected: ${item.label}`)
                  setVisible(false)
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
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 8,
  },
  triggerText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "500",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownContent: {
    width: 220,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 8,
    borderRadius: 4,
  },
  menuText: {
    fontSize: 14,
    color: "#1F2937",
  },
})

export default DropdownMenu
