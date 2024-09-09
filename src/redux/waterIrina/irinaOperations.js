import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const fetchTodayWater = createAsyncThunk(
  "irinaWater/todayWaterList",
  async (_, thunkAPI) => {
    const day = createDay();
    const token = localStorage.getItem("authToken");
    setAuthHeader(token);
    try {
      const res = await axios.get(`water/day?day=${day}`);
      console.log(res);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
