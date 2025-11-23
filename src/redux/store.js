import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from '@reduxjs/toolkit';
import yemekCartReducer from './slices/yemekCartSlice';
import marketCartReducer from './slices/marketCartSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['yemekCart', 'marketCart'], // sadece sepetleri persist et
};

const rootReducer = combineReducers({
  yemekCart: yemekCartReducer,
  marketCart: marketCartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
