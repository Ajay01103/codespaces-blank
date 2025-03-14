import {
  View,
  Text,
  StyleSheet,
  Platform,
  TextInput,
  TouchableOpacity,
} from "react-native"
import React, { useEffect, useState } from "react"
import Colors from "@/constants/Colors"
import { KeyboardAvoidingView } from "react-native"
import { useRouter } from "expo-router"
import { defaultStyles } from "@/constants/Styles"
import { Ionicons } from "@expo/vector-icons"
import { useAuthStore } from "@/store/user-store"

const LoginPage = () => {
  const [countryCode, setCountryCode] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState("")
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0
  const router = useRouter()

  const {
    phoneNumber: mmkvPhoneNumber,
    setPhoneNumber: setMMKVPhoneNumber,
    setCountryCode: setMMKVCountryCode,
  } = useAuthStore()

  const handleLogin = () => {
    if (phoneNumber.length >= 10) {
      //save to MMKV storage
      setMMKVPhoneNumber(phoneNumber)
      setMMKVCountryCode(countryCode)
      // Navigate to home
      router.replace("/home")
    }
  }

  useEffect(() => {
    if (mmkvPhoneNumber) {
      router.replace("/home")
    }
  }, [mmkvPhoneNumber])

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.header}>Welcome back</Text>
        <Text style={defaultStyles.descriptionText}>
          Enter the phone number associated with your account
        </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Country code"
            placeholderTextColor={Colors.gray}
            value={countryCode}
            onChangeText={setCountryCode}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Mobile number"
            placeholderTextColor={Colors.gray}
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
          style={[
            defaultStyles.pillButton,
            phoneNumber !== "" ? styles.enabled : styles.disabled,
            { marginBottom: 20 },
          ]}
          onPress={handleLogin}
        >
          <Text style={defaultStyles.buttonText}>Continue</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 16 }}>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
          <Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
          <View
            style={{
              flex: 1,
              height: StyleSheet.hairlineWidth,
              backgroundColor: Colors.gray,
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.replace("/home")}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons
            name="mail"
            size={24}
            color={"#000"}
          />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.replace("/home")}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons
            name="logo-google"
            size={24}
            color={"#000"}
          />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email{" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          //   onPress={() => onSignIn(SignInType.Apple)}
          style={[
            defaultStyles.pillButton,
            {
              flexDirection: "row",
              gap: 16,
              marginTop: 20,
              backgroundColor: "#fff",
            },
          ]}
        >
          <Ionicons
            name="logo-apple"
            size={24}
            color={"#000"}
          />
          <Text style={[defaultStyles.buttonText, { color: "#000" }]}>
            Continue with email{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 40,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
})

export default LoginPage
