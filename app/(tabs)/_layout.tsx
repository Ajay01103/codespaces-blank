import { View, Text } from "react-native"
import React from "react"
import { Tabs } from "expo-router"
import { FontAwesome } from "@expo/vector-icons"
import CustomHeader from "@/components/custom-header"
import Colors from "@/constants/Colors"
import { BlurView } from "expo-blur"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"

const Layout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarBackground: () => (
              <BlurView
                intensity={100}
                tint={"extraLight"}
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.05)",
                }}
              />
            ),
            tabBarStyle: {
              backgroundColor: "transparent",
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              elevation: 0,
              borderTopWidth: 0,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              tabBarIcon: ({ size, color }) => (
                <FontAwesome
                  name="registered"
                  size={size}
                  color={color}
                />
              ),
              header: () => <CustomHeader />,
              headerTransparent: true,
            }}
          />

          <Tabs.Screen
            name="invest"
            options={{
              // title: "Invest",
              headerShown: false,

              tabBarIcon: ({ size, color }) => (
                <FontAwesome
                  name="line-chart"
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="transfers"
            options={{
              title: "Transfers",
              headerShown: false,
              tabBarIcon: ({ size, color }) => (
                <FontAwesome
                  name="exchange"
                  size={size}
                  color={color}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="crypto"
            options={{
              title: "Crypto",
              tabBarIcon: ({ size, color }) => (
                <FontAwesome
                  name="bitcoin"
                  size={size}
                  color={color}
                />
              ),
              header: () => <CustomHeader />,
              headerTransparent: true,
            }}
          />

          <Tabs.Screen
            name="lifestyle"
            options={{
              title: "Lifestyle",
              tabBarIcon: ({ size, color }) => (
                <FontAwesome
                  name="th"
                  size={size}
                  color={color}
                />
              ),
            }}
          />
        </Tabs>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

export default Layout
