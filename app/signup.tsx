import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
} from "react-native"
import React, { useEffect, useState } from "react"
import { defaultStyles } from "@/constants/Styles"
import Colors from "@/constants/Colors"
import { Link, useRouter } from "expo-router"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"

const SugnupPage = () => {
  const router = useRouter()
  const keyboardVerticalOffset = Platform.OS === "ios" ? 80 : 0
  const [countryCode, setCountryCode] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState("")
  const screenHeight = Dimensions.get("window").height

  // Create animated value for keyboard height
  const keyboardHeight = useSharedValue(0)

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        // Adjust animation to move content up by half the keyboard height
        keyboardHeight.value = withSpring(-e.endCoordinates.height / 8, {
          mass: 1,
          damping: 18,
          stiffness: 100,
        })
      }
    )

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        keyboardHeight.value = withSpring(0, {
          mass: 1,
          damping: 18,
          stiffness: 100,
        })
      }
    )

    return () => {
      keyboardWillShow.remove()
      keyboardWillHide.remove()
    }
  }, [])

  // Create animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: keyboardHeight.value }],
    }
  })

  const onSignup = () => {
    router.replace("/home")
  }
  return (
    // <KeyboardAvoidingView
    //   style={{ flex: 1 }}
    //   behavior="padding"
    //   keyboardVerticalOffset={keyboardVerticalOffset}
    // >
    //   <View style={defaultStyles.container}>
    //     <Text style={defaultStyles.header}>Let's get started!</Text>
    //     <Text style={defaultStyles.descriptionText}>
    //       Enter your phone number. We will send you a confirmation code there
    //     </Text>
    //     <View style={styles.inputContainer}>
    //       <TextInput
    //         style={styles.input}
    //         placeholder="Country code"
    //         placeholderTextColor={Colors.gray}
    //         value={countryCode}
    //       />
    //       <TextInput
    //         style={[styles.input, { flex: 1 }]}
    //         placeholder="Mobile number"
    //         placeholderTextColor={Colors.gray}
    //         keyboardType="numeric"
    //         value={phoneNumber}
    //         onChangeText={setPhoneNumber}
    //       />
    //     </View>

    //     <Link
    //       href={"/login"}
    //       replace
    //       asChild
    //     >
    //       <TouchableOpacity>
    //         <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
    //       </TouchableOpacity>
    //     </Link>

    //     <View style={{ flex: 1 }} />

    //     <TouchableOpacity
    //       style={[
    //         defaultStyles.pillButton,
    //         phoneNumber !== "" ? styles.enabled : styles.disabled,
    //         { marginBottom: 20 },
    //       ]}
    //       onPress={onSignup}
    //     >
    //       <Text style={defaultStyles.buttonText}>Sign up</Text>
    //     </TouchableOpacity>
    //   </View>
    // </KeyboardAvoidingView>
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.contentContainer}>
        <View style={styles.topContent}>
          <Text style={defaultStyles.header}>Let's get started!</Text>
          <Text style={defaultStyles.descriptionText}>
            Enter your phone number. We will send you a confirmation code there
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Country code"
              placeholderTextColor={Colors.gray}
              value={countryCode}
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
        </View>

        <View style={styles.bottomContent}>
          <Link
            href={"/login"}
            replace
            asChild
          >
            <TouchableOpacity>
              <Text style={defaultStyles.textLink}>Already have an account? Log in</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            style={[
              defaultStyles.pillButton,
              styles.signupButton,
              phoneNumber !== "" ? styles.enabled : styles.disabled,
            ]}
            onPress={onSignup}
          >
            <Text style={defaultStyles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    justifyContent: "space-between",
  },
  topContent: {
    flex: 0,
    marginBottom: 20,
  },
  bottomContent: {
    width: "100%",
    paddingBottom: Platform.OS === "ios" ? 40 : 20,
    alignItems: "center",
  },
  inputContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
  input: {
    backgroundColor: Colors.lightGray,
    padding: 20,
    borderRadius: 16,
    fontSize: 20,
    marginRight: 10,
  },
  signupButton: {
    marginTop: 16,
    width: "100%",
  },
  enabled: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    backgroundColor: Colors.primaryMuted,
  },
})

export default SugnupPage
