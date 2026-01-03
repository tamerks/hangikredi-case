import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Platform, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, ShoppingBag, ShoppingCart, User } from "lucide-react-native";
import HomeScreen from "../screens/home/HomeScreen";
// import ProfilScreen from "../screens/profile/ProfilScreen"; // Replaced by Stack
import ProfileStackNavigator from "./ProfileStackNavigator";
import YemekStackNavigator from "./YemekStackNavigator";
import MarketStackNavigator from "./MarketStackNavigator";
import {
  Theme,
  Spacing,
  Shadows,
  Radius,
  Typography,
} from "../constants/Theme";

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Theme.primary,
        tabBarInactiveTintColor: Theme.mutedForeground,
        tabBarStyle: {
          backgroundColor: Theme.background,
          borderTopColor: Theme.border,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 88 : 68,
          paddingTop: Spacing.sm,
          paddingBottom: Platform.OS === "ios" ? insets.bottom : Spacing.md,
          elevation: 0,
        },
        tabBarLabelStyle: {
          fontFamily: Typography.family.medium,
          fontSize: 12,
          marginTop: -4,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Ana Sayfa",
          tabBarIcon: ({ color, size }) => (
            <Home size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen
        name="Yemek"
        component={YemekStackNavigator}
        options={{
          tabBarLabel: "Yemek",
          tabBarIcon: ({ color, size }) => (
            <ShoppingBag size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketStackNavigator}
        options={{
          tabBarLabel: "Market",
          tabBarIcon: ({ color, size }) => (
            <ShoppingCart size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: "Profil",
          tabBarIcon: ({ color, size }) => (
            <User size={24} color={color} strokeWidth={2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
