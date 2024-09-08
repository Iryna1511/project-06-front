/* import { configureStore } from "@reduxjs/toolkit";
// import { waterReducer } from "./water/waterSlice";
import { authReducer } from "./auth/authSlice.js";
import { waterReducer } from "./water/waterSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    water: waterReducer,
  },
});
 */

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/authSlice";
import { waterReducer } from "./water/waterSlice";
import { waterDetailsREducer } from "./waterDetails/waterSlice";
import { dailyNormaReducer } from "./dailyNorma/dailyNormaSlice";
import { monthWaterReducer } from "./monthWater/monthWaterSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // persist only the token
};

// Combining all reducers
const rootReducer = combineReducers({
  auth: persistReducer(authConfig, authReducer), // persist auth with token whitelist
  water: waterReducer, // from first store file
  waterDetails: waterDetailsREducer, // from second store file
  dailyNorma: dailyNormaReducer,
  monthWater: monthWaterReducer,
});

// Creating the store with persisted auth and middlewares
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistor for persisting the store
export const persistor = persistStore(store);
