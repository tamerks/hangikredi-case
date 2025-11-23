import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import YemekAnaSayfa from '../screens/yemek/YemekAnaSayfa';
import YemekSepet from '../screens/yemek/YemekSepet';
import { DefaultColors } from '../constants/DefaultColors';

const Stack = createNativeStackNavigator();

export default function YemekStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: DefaultColors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="YemekAnaSayfa"
        component={YemekAnaSayfa}
        options={{ title: 'Yemek Siparişi' }}
      />
      <Stack.Screen
        name="YemekSepet"
        component={YemekSepet}
        options={{ title: 'Yemek Sepeti' }}
      />
    </Stack.Navigator>
  );
}

