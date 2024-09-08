import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authApi } from "../../axiosConfig/authAPI";

axios.defaults.baseURL = "https://water-tracker-06.onrender.com/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const removeAuthHeader = () => {
  axios.defaults.headers.common.Authorization = ``;
};

export const register = createAsyncThunk(
  "/auth/register",
  async (newUser, thunkAPI) => {
    try {
      const response = await axios.post("/auth/register", newUser);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk("/auth/login", async (user, thunkAPI) => {
  try {
    const response = await axios.post("/auth/login", user);
    const token = response.data.data.accessToken;
    console.log("токен при логіні, який ми записуємо в хедер і кукі", token);

    setAuthHeader(token);
    localStorage.setItem("authToken", token);

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    removeAuthHeader();
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
        const response = await axios.get("/user");

        return response.data;
      }
      return thunkAPI.rejectWithValue("No token available");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const updateDailyNorma = createAsyncThunk(
  "user/dailyNorma",
  async (waterToDrink, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token || localStorage.getItem("authToken");
      if (token) {
        setAuthHeader(token);
      }
      const res = await axios.patch("/user/waterRate", {
        waterRate: waterToDrink,
      });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
