import { createSlice } from '@reduxjs/toolkit';

import { getDailyNorma, updateDailyNorma } from './dailyNormaThunk';

const initialState = {
  dailyNorma: 0,
  weight: 0,
  gender: 'woman',
  activityTime: 0,
  willDrink: 0,
  isLoading: false,
};

export const dailyNormaSlice = createSlice({
  name: 'dailyNorma',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDailyNorma.pending, state => {
        state.isLoading = true;
      })
      .addCase(getDailyNorma.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dailyNorma = payload.dailyNorma;
        state.weight = payload.weight;
        state.gender = payload.gender;
        state.activityTime = payload.activityTime;
        state.willDrink = payload.willDrink;
      })
      .addCase(getDailyNorma.rejected, state => {
        state.isLoading = false;
      })
      .addCase(updateDailyNorma.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateDailyNorma.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dailyNorma = payload.updatedDailyNorma;
        state.weight = payload.updatedWeight;
        state.gender = payload.updatedGender;
        state.activityTime = payload.updatedActivityTime;
        state.willDrink = payload.updatedWillDrink;
      })

      .addCase(updateDailyNorma.rejected, state => {
        state.isLoading = false;
      });
  },
});

export const selectDailyNorma = state => state.dailyNorma.dailyNorma;

export const dailyNormaReducer = dailyNormaSlice.reducer;