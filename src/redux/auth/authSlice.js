import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register, refreshUser } from "./operations.js";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {
      email: null,
      name: null,
      avatar: null,
      gender: null,
      _id: null,
    },
    token: null,
    isLoggedIn: false,
    isLoading: false,
    isRefreshing: false,
    error: null,
    isLogoutModalOpen: false,
  },
  reducers: {
    toggleIsOpenLogoutModal: (state) => {
      state.isLogoutModalOpen = !state.isLogoutModalOpen
    },
    updateUserData: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, handlePending)
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, handleRejected)
      // .addCase(register.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload || "Registration error!";
      // })

      .addCase(login.pending, handlePending)
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.token = action.payload.data.accessToken;
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, handleRejected)
      // .addCase(login.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload || "Login error!";
      // })

      .addCase(logout.pending, handlePending)
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
      .addCase(logout.rejected, handleRejected)
      // .addCase(logout.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.error = action.payload || "Logout error!";
      // })

      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.isRefreshing = false;
        state.isLoading = false;
        state.error = action.payload || "Error refreshing user data";
      });
  },
});

export const authReducer = authSlice.reducer;
export const { toggleIsOpenLogoutModal } = authSlice.actions;
  export const { updateUserData } = authSlice.actions;