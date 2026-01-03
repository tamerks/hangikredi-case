import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MarketAnaSayfa from "../screens/market/MarketAnaSayfa";
import MarketSepet from "../screens/market/MarketSepet";
import MarketDetay from "../screens/market/MarketDetay";
import OdemeEkrani from "../screens/checkout/OdemeEkrani";
import SiparisSonuc from "../screens/checkout/SiparisSonuc";
import { Theme, Typography } from "../constants/Theme";

const Stack = createNativeStackNavigator();

export default function MarketStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Theme.background,
        },
        headerTintColor: Theme.foreground,
        headerTitleStyle: {
          fontFamily: Typography.family.semiBold,
          color: Theme.foreground,
        },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        contentStyle: { backgroundColor: Theme.background },
      }}
    >
      <Stack.Screen
        name="MarketAnaSayfa"
        component={MarketAnaSayfa}
        options={{ title: "Market Alışverişi" }}
      />
      <Stack.Screen
        name="MarketSepet"
        component={MarketSepet}
        options={{ title: "Sepetim" }}
      />
      <Stack.Screen
        name="MarketDetay"
        component={MarketDetay}
        options={{ title: "Ürün Bilgisi" }}
      />
      <Stack.Screen
        name="OdemeEkrani"
        component={OdemeEkrani}
        options={{ title: "Ödeme" }}
      />
      <Stack.Screen
        name="SiparisSonuc"
        component={SiparisSonuc}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
