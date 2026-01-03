import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import YemekAnaSayfa from "../screens/yemek/YemekAnaSayfa";
import YemekSepet from "../screens/yemek/YemekSepet";
import YemekDetay from "../screens/yemek/YemekDetay";
import OdemeEkrani from "../screens/checkout/OdemeEkrani";
import SiparisSonuc from "../screens/checkout/SiparisSonuc";
import { Theme, Typography } from "../constants/Theme";

const Stack = createNativeStackNavigator();

export default function YemekStackNavigator() {
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
        name="YemekAnaSayfa"
        component={YemekAnaSayfa}
        options={{ title: "Yemek Siparişi" }}
      />
      <Stack.Screen
        name="YemekSepet"
        component={YemekSepet}
        options={{ title: "Sepetim" }}
      />
      <Stack.Screen
        name="YemekDetay"
        component={YemekDetay}
        options={{
          title: "Ürün Detayı",
          headerTransparent: true,
          headerTintColor: Theme.primary,
          headerTitle: "",
          headerStyle: { backgroundColor: "transparent" },
        }}
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
