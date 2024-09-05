import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  logout,
  register,
  refreshUser,
  refreshToken,
} from "./operations.js";

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
    isRefreshing: false,
    error: null,
    isLogoutModalOpen: false,
  },
  reducers: {
    openLogoutModal: (state) => {
      state.isLogoutModalOpen = true;
    },
    closeLogoutModal: (state) => {
      state.isLogoutModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = false;
        state.isLoggedIn = false; //Тут змінила на false, бо має направляти на сторінку логування після умпішної реєстрації  @ Olena Lytovchenko
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Registration error!";
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
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
        state.isLogoutModalOpen = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Logout error!";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token = action.payload.data.accessToken;
        console.log(state.token);
      })
      .addCase(refreshToken.rejected, (state) => {
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log("Refresh User Fulfilled, Payload:", state.user);
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        console.log("Refresh User Rejected, Error:", action.error.message);
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = action.payload || "Error refreshing user data";
      });
    // .addCase(refreshUser.fulfilled, (state, action) => {
    //   state.user = action.payload;
    //   console.log("Refresh User Fulfilled, Payload:", state.user);
    //   state.isLoggedIn = true;
    //   state.isRefreshing = false;
    // })
    // .addCase(refreshUser.rejected, (state, action) => {
    //   console.log("Refresh User Rejected, Error:", action.error.message);
    //   state.isRefreshing = false;
    // });
  },
});

export const { openLogoutModal, closeLogoutModal } = authSlice.actions;
export const authReducer = authSlice.reducer;
