import { configureStore } from "@reduxjs/toolkit";
// import { waterReducer } from "./water/waterSlice";
import { authReducer } from "./auth/authSlice.js";
import { waterReducer } from "./water/waterSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    water: waterReducer,
  },
});
