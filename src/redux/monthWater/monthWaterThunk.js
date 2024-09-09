import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosLoader } from '../../axiosConfig/axiosLoader';

export const getMonthWater = createAsyncThunk(
  'monthWater/getMonthWater',
  async (selectDate, thunkAPI) => {
    try {
      const { data } = await axiosLoader.get(`/water/month?date=${selectDate}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
