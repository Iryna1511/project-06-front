import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchDailyNorma, newDailyNorm } from '../../axiosConfig/authAPI';

export const getDailyNorma = createAsyncThunk(
  'auth/getDailyNorma',
  async (id, { rejectWithValue }) => {
    try {
      const dailyNorma = await fetchDailyNorma(id);
      return dailyNorma;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateDailyNorma = createAsyncThunk(
  'auth/updateDailyNorma',
  async ({ id, dailyNorma, gender, weight, activityTime, willDrink }, { rejectWithValue }) => {
    try {
      const updatedData = {
        dailyNorma,
        gender,
        weight,
        activityTime,
        willDrink,
      };
      const updatedUser = await newDailyNorm({ id, updatedData });
      return updatedUser;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
