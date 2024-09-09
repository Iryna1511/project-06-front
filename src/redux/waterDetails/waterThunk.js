import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosLoader } from '../../axiosConfig/axiosLoader';


export const getTodayWater = createAsyncThunk('water/getTodayWater', async (_, thunkAPI) => {
  try {
    const time = newDate(new Date());
    const { data } = await axiosLoader.get(
      `/api/user/water/today?date=${time}`
    );
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const addWatersThunk = createAsyncThunk(
  'water/addWater',
  async (newWater, { rejectWithValue }) => {
    try {
      const { data } = await axiosLoader.post("/api/user/water", newWater);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editWaterThunk = createAsyncThunk(
  'water/editWater',
  async ({ _id, waterVolume, time, id }, { rejectWithValue }) => {
    try {
      const newWater = { waterVolume, time };
      const { data } = await axiosLoader.put(
        `/api/user/water/${_id}?portionID=${id}`,
        newWater
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteWaterThunk = createAsyncThunk(
  'water/deleteWater',
  async (dataDelete, { rejectWithValue }) => {
    try {
      await axiosLoader.delete(`/api/user/water/${_id}?portionID=${id}`);
      return dataDelete.id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
