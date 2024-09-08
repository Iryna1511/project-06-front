import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchTodayWater,
  addWaters,
  editWater,
  deleteWater,
} from "../../axiosConfig/authAPI";

// поправлю цю, щоб був коректний запит на бекк
export const getTodayWater = createAsyncThunk(
  "water/getTodayWater",
  async (_, thunkAPI) => {
    try {
      const water = await fetchTodayWater();
      return water;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const addWatersThunk = createAsyncThunk(
  "water/addWater",
  async (newWater, { rejectWithValue }) => {
    try {
      const data = await addWaters(newWater);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editWaterThunk = createAsyncThunk(
  "water/editWater",
  async ({ _id, waterVolume, time, id }, { rejectWithValue }) => {
    try {
      const newWater = { waterVolume, time };
      const response = await editWater({ newWater, id, _id });
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWaterThunk = createAsyncThunk(
  "water/deleteWater",
  async (dataDelete, { rejectWithValue }) => {
    try {
      deleteWater(dataDelete);
      return dataDelete.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
