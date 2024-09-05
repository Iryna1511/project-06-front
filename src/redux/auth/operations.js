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

    setAuthHeader(token);
    Cookies.set("refreshToken", token, { expires: 7 });

    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk("/auth/logout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/logout");
    removeAuthHeader();
    Cookies.remove("refreshToken");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, thunkAPI) => {
    try {
      // Отримуємо refreshToken з куки
      const refreshToken = Cookies.get("refreshToken");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      // Встановлюємо заголовок з refreshToken
      setAuthHeader(refreshToken);

      const response = await axios.post("/auth/refresh");

      // Отримуємо новий токен
      const newToken = response.data.data.accessToken;

      // Оновлюємо заголовки і зберігаємо новий токен
      setAuthHeader(newToken);
      Cookies.set("refreshToken", newToken, { expires: 7 });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    try {
      // Спочатку оновлюємо токен
      await thunkAPI.dispatch(refreshToken());

      // Після оновлення токена отримуємо дані користувача
      const response = await axios.get("/user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
