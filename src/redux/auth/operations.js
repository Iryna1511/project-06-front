import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosLoader } from "../../axiosConfig/axiosLoader";

export const register = createAsyncThunk(
  "/auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axiosLoader.post("/auth/register", newUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk("/auth/login", async (user, thunkAPI) => {
  try {
    const response = await axiosLoader.post("/auth/login", user);
    const token = response.data.data.accessToken;
    // console.log("токен при логіні, який ми записуємо в хедер і кукі", token);

    // setAuthHeader(token);
    localStorage.setItem("authToken", token);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
//Liza 
export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    await axiosLoader.post("/auth/logout");
    // removeAuthHeader();
    localStorage.removeItem("authToken");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token || localStorage.getItem("authToken");
      if (token) {
        setAuthHeader(token);
        const response = await axiosLoader.get("/user");

        return response.data;
      }
      return thunkAPI.rejectWithValue("No token available");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateUserWaterDailyNorma = createAsyncThunk(
  "user/dailyNorma",
  async (waterToDrink, thunkAPI) => {
    try {
      // const reduxState = thunkAPI.getState();
      // const token = reduxState.auth.token || localStorage.getItem("authToken");
      // if (token) {
      //   setAuthHeader(token);
      // }
      const res = await axiosLoader.patch("/user/waterRate", {
        waterRate: waterToDrink,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
