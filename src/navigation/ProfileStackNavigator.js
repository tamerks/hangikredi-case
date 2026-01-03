import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfilScreen from "../screens/profile/ProfilScreen";
import Adreslerim from "../screens/profile/Adreslerim";
import Siparislerim from "../screens/profile/Siparislerim";
import OdemeYontemleri from "../screens/profile/OdemeYontemleri";
import { Theme, Typography } from "../constants/Theme";

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
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
        name="ProfilMain"
        component={ProfilScreen}
        options={{ headerShown: false }} // ProfilScreen'in kendi header'ı var veya custom header kullanıyor
      />
      <Stack.Screen
        name="Adreslerim"
        component={Adreslerim}
        options={{ title: "Adreslerim" }}
      />
      <Stack.Screen
        name="Siparislerim"
        component={Siparislerim}
        options={{ title: "Siparişlerim" }}
      />
      <Stack.Screen
        name="OdemeYontemleri"
        component={OdemeYontemleri}
        options={{ title: "Ödeme Yöntemleri" }}
      />
    </Stack.Navigator>
  );
}
