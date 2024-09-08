import { createAsyncThunk } from "@reduxjs/toolkit";
import { authApi } from "../../axiosConfig/authAPI.js";
import { monthNames } from "../../constans/monthNames";

export const addWaterThunk = createAsyncThunk(
  "addWater",
  async (waterData, thunkAPI) => {
    try {
      const { data } = await authApi.post("water", waterData);
      thunkAPI.dispatch(fetchWaterDataMonthThunk());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const editWaterThunk = createAsyncThunk(
  "editWater",
  async (waterData, thunkAPI) => {
    const { amount, date, id } = waterData;
    try {
      const { data } = await authApi.patch(`water/${id}`, { amount, date });
      thunkAPI.dispatch(fetchWaterDataMonthThunk());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteWaterThunk = createAsyncThunk(
  "deleteWater",
  async (waterData, thunkAPI) => {
    try {
      const { data } = await authApi.delete(`water/${waterData.id}`);
      thunkAPI.dispatch(fetchWaterDataMonthThunk());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// допрацьовую цей запит Іра Г
export const fetchWaterDataTodayThunk = createAsyncThunk(
  "fetchWaterDataToday",
  async (_, thunkAPI) => {
    try {
      const date = new Date();
      const isoDate = date.toISOString();
      const day = isoDate.split("T")[0];

      const { data } = await authApi.get(`water/day?day=${day}`);
      console.log(data);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchWaterDataMonthThunk = createAsyncThunk(
  "fetchWaterDataMonth",
  async (
    {
      year = new Date().getFullYear(),
      month = monthNames[new Date().getMonth()],
    } = {},
    thunkAPI
  ) => {
    try {
      const { data } = await authApi.get(`water/${year}/${month}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
