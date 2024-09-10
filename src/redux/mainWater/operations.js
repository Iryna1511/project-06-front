import { createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosLoader } from "../../axiosConfig/axiosLoader";
import axios from "axios";

axios.defaults.baseURL = "https://water-tracker-06.onrender.com";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

function createDay() {
  const date = new Date();
  const isoDate = date.toISOString();
  const day = isoDate.split("T")[0];
  return day;
}

// Додавання нової води
export const addWater = createAsyncThunk(
  "water/addWater",
  async (newWater, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (token) {
      setAuthHeader(token);
    }

    try {
      const response = await axiosLoader.post("/water", newWater);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Зміна запису по воді
export const editWaterConsumption = createAsyncThunk(
  "water/editWater",
  async ({ id, updates }, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (token) {
      setAuthHeader(token);
    }
    try {
      const response = await axios.patch(`/water/${id}`, updates);
      // console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Видалення запису по воді
export const deleteWaterEntry = createAsyncThunk(
  "water/deleteWaterEntry",
  async (id, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (token) {
      setAuthHeader(token);
    }
    try {
      const res = await axios.delete(`/water/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//
export const fetchTodayWater = createAsyncThunk(
  "water/todayWaterList",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (token) {
      setAuthHeader(token);
    }
    const day = createDay();

    try {
      const res = await axios.get(`water/day?day=${day}`);
      // console.log(res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
