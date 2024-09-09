import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosLoader } from "../../axiosConfig/axiosLoader";
import axios from "axios";

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
    try {
      const response = await axios.post("/water", newWater);
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
    try {
      const response = await axiosLoader.patch(`/water/${id}`, updates);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

//
export const fetchTodayWater = createAsyncThunk(
  "irinaWater/todayWaterList",
  async (_, thunkAPI) => {
    const day = createDay();
    // const token = localStorage.getItem("authToken");
    // setAuthHeader(token);
    try {
      const res = await axiosLoader.get(`water/day?day=${day}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);