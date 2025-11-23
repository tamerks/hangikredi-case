import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import RootNavigator from './src/navigation/RootNavigator';
import { store, persistor } from './src/redux/store';
import { DefaultColors } from './src/constants/DefaultColors';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={DefaultColors.primary} />
          </View>
        }
        persistor={persistor}
      >
        <SafeAreaProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <RootNavigator />
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}
