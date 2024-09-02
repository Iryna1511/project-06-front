import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "./operations.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: null,
      password: null,
    },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
      console.log("Register pending...");
      state.isLoading = true;
      state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      console.log("Register fulfilled...", action.payload);
      state.user = action.payload;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isLoggedIn = true;
    })
    .addCase(register.rejected, (state, action) => {
      console.log("Register rejected...", action.payload);
      state.isLoading = false;
      state.error = action.payload || "Registration error!";
    })
    .addCase(login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      console.log("Login successful:", action.payload.token);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoading = false;
      state.isLoggedIn = true;
    })
    .addCase(login.rejected, (state, action) => {
      console.log("Login error:", action.payload);
      state.isLoading = false;
      state.error = action.payload || "Login error!";
    })
    .addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(logout.fulfilled, (state) => {
      state.user = {
        email: null,
        password: null,
      };
      state.token = null;
      state.isLoading = false;
      state.isLoggedIn = false;
    })
    .addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Logout error!";
    });
  },
});

export const authReducer = authSlice.reducer;
