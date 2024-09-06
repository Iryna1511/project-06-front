/* import { configureStore } from "@reduxjs/toolkit";
// import { waterReducer } from "./water/waterSlice";
import { authReducer } from "./auth/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
 */

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/authSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { waterReducer } from './waterDetails/waterSlice';
import { dailyNormaReducer } from './dailyNorma/dailyNormaSlice';
import { monthWaterReducer } from './monthWater/monthWaterSlice';

// Конфігурація для персистенції auth
const authConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

// Кореневий ред'юсер, який включає персистований auth та інші ред'юсери
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer), // Персистенція для auth
  waterDetails: waterReducer,
  dailyNorma: dailyNormaReducer,
  monthWater: monthWaterReducer,
});

// Створення стору з персистенцією та middleware
export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Експортуємо persistor для роботи з персистенцією
export const persistor = persistStore(store);
