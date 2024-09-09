import { createSlice, isAnyOf } from "@reduxjs/toolkit";

import {
  addWatersThunk,
  deleteWaterThunk,
  editWaterThunk,
  getTodayWater,
} from "./waterThunk";

const initialState = {
  month: [],
  today: {
    waterlist: [],
  },
  dailyDrank: 0,
  waterNorma: 0,
  ownerId: 0,
  isLoading: false,
};

const waterSlice = createSlice({
  name: "water",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getTodayWater.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.today = payload;
        state.dailyDrank = state.today.drankWater;
        state.ownerId = state.today._id;
        state.waterNorma = state.today.dailyNorma;
      })
      .addCase(addWatersThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const newWaterVolume = payload.waterVolume;
        const newTime = payload.time;
        const newWaterId = payload.id;
        const newArr = {
          waterVolume: newWaterVolume,
          time: newTime,
          id: newWaterId,
        };
        state.today.waterlist.push(newArr);
        state.dailyDrank += newWaterVolume;
      })
      .addCase(editWaterThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const array = state.today.waterlist;
        const idx = array.findIndex((item) => item.id === payload.id);
        if (idx !== -1) {
          array[idx] = payload;
        }
        state.dailyDrank = array.reduce(
          (acc, item) => acc + item.waterVolume,
          0
        );
      })
      .addCase(deleteWaterThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.today.waterlist = state.today.waterlist.filter(
          (data) => data.id !== payload
        );
        const arr = state.today.waterlist;
        state.dailyDrank = arr.reduce((acc, item) => acc + item.waterVolume, 0);
      })
      .addMatcher(
        isAnyOf(
          getTodayWater.pending,
          addWatersThunk.pending,
          editWaterThunk.pending,
          deleteWaterThunk.pending
        ),
        (state) => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          getTodayWater.rejected,
          addWatersThunk.rejected,
          deleteWaterThunk.rejected,
          editWaterThunk.rejected
        ),
        (state) => {
          state.isLoading = false;
        }
      );
  },
});

export const waterReducer = waterSlice.reducer;
