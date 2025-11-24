import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const extra =
  Constants?.expoConfig?.extra ??
  Constants?.manifest?.extra ??
  Constants?.manifest2?.extra ??
  {};

const firebaseConfig = extra?.firebase ?? {};

if (!firebaseConfig?.apiKey) {
  throw new Error(
    'Firebase yapılandırması eksik. Lütfen .env dosyasını doldurduğunuzdan emin olun.',
  );
}

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export default app;
