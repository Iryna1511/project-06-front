import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { getMonthWater } from './monthWaterThunk';

const initialState = {
  month: [],
  isLoading: false,
  error: null,
};

const monthWaterSlice = createSlice({
  name: 'monthWater',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getMonthWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        //потрібно правильно розпарсити дані або змінити на фронті
        
        console.log("Fix me!!!!");
        state.month = []//action.payload.data;
      })

      .addMatcher(isAnyOf(getMonthWater.pending), state => {
        state.isLoading = true;
      })
      .addMatcher(isAnyOf(getMonthWater.rejected), (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});
export const monthWaterReducer = monthWaterSlice.reducer;
