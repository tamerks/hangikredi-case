import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MarketAnaSayfa from '../screens/market/MarketAnaSayfa';
import MarketSepet from '../screens/market/MarketSepet';

const Stack = createNativeStackNavigator();

export default function MarketStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#03a9f4',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="MarketAnaSayfa"
        component={MarketAnaSayfa}
        options={{ title: 'Market Alışverişi' }}
      />
      <Stack.Screen
        name="MarketSepet"
        component={MarketSepet}
        options={{ title: 'Market Sepeti' }}
      />
    </Stack.Navigator>
  );
}

