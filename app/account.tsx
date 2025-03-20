import { View, Text, StyleSheet, Image, ScrollView, Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Feather } from "@expo/vector-icons"
import React from "react"
import { useAuthStore } from "@/store/user-store"
import { useRouter } from "expo-router"

const ProfileSection = ({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Feather.glyphMap
  title: string
  value: string
}) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Feather
        name={icon}
        size={20}
        color="#6B7280"
      />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <Text style={styles.sectionValue}>{value}</Text>
  </View>
)

const Account = () => {
  const { top } = useSafeAreaInsets()
  const router = useRouter()
  const { countryCode, phoneNumber, clearAuth } = useAuthStore()
  // Mock user data - replace with actual store data
  const user = {
    name: "Ajay Singh",
    countryCode,
    phone: phoneNumber,
    email: "ajay.dev@example.com",
    memberSince: "March 2025",
    accountType: "Premium",
  }

  const handleLogout = () => {
    clearAuth()
    router.replace("/login")
  }

  return (
    <ScrollView
      style={[styles.container, { paddingTop: top + 20 }]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://ui-avatars.com/api/?name=John+Doe&background=0D9488&color=fff",
            }}
            style={styles.avatar}
          />
          <View style={styles.editButton}>
            <Feather
              name="edit-2"
              size={16}
              color="#fff"
            />
          </View>
        </View>
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <View style={styles.infoContainer}>
        <ProfileSection
          icon="phone"
          title="Phone Number"
          value={`${user.countryCode} ${user.phone}`}
        />
        <ProfileSection
          icon="mail"
          title="Email"
          value={user.email}
        />
        <ProfileSection
          icon="calendar"
          title="Member Since"
          value={user.memberSince}
        />
        <ProfileSection
          icon="award"
          title="Account Type"
          value={user.accountType}
        />
      </View>

      <Pressable
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Feather
          name="log-out"
          size={20}
          color="#EF4444"
        />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0D9488",
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "600",
    color: "#1F2937",
  },
  infoContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 20,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  sectionValue: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
  },
  logoutText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default Account
