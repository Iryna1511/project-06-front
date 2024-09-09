import { createAsyncThunk } from "@reduxjs/toolkit";
import { monthNames } from "../../constans/monthNames";
import { axiosLoader } from "../../axiosConfig/axiosLoader.js";

export const addWaterThunk = createAsyncThunk(
  "addWater",
  async (waterData, thunkAPI) => {
    try {
      const { data } = await axiosLoader.post("water", waterData);
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
      const { data } = await axiosLoader.patch(`water/${id}`, { amount, date });
      thunkAPI.dispatch(fetchWaterDataMonthThunk());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
//Liza 
export const deleteWaterThunk = createAsyncThunk(
  "deleteWater",
  async (waterData, thunkAPI) => {
    try {
      const { data } = await axiosLoader.delete(`water/${waterData.id}`);
      thunkAPI.dispatch(fetchWaterDataMonthThunk());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchWaterDataTodayThunk = createAsyncThunk(
  "fetchWaterDataToday",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosLoader.get("water/today");
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
      const { data } = await axiosLoader.get(`water/${year}/${month}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
