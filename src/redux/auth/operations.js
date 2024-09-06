import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";

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
    // console.log("токен при логіні, який ми записуємо в хедер і кукі", token);

    setAuthHeader(token);
    Cookies.set("authToken", token, { expires: 7 });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    removeAuthHeader();
    Cookies.remove("authToken");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    try {
      const reduxState = thunkAPI.getState();
      const token = reduxState.auth.token || Cookies.get("authToken"); // Отримуємо токен з Redux або куків
      if (token) {
        setAuthHeader(token);
        const response = await axios.get("/user");

        console.log("Server response:", response.data);
        return response.data;
      }
      return thunkAPI.rejectWithValue("No token available");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const reduxState = thunkAPI.getState();
      return (
        reduxState.auth.token !== null || Cookies.get("authToken") !== null
      );
    },
  }
);
