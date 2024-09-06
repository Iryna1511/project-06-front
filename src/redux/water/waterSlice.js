import { createSlice } from "@reduxjs/toolkit";

import {
  addWaterThunk,
  deleteWaterThunk,
  editWaterThunk,
  fetchWaterDataMonthThunk,
  fetchWaterDataTodayThunk,
} from "./operations";

const initialState = {
  percent: 0,
  notes: [],
  notesPerMonth: [],
};

const slice = createSlice({
  name: "water",
  initialState,
  selectors: {
    selectNotes: (state) => state.notes,
    selectPercent: (state) => state.percent,
    selectNotesPerMonth: (state) => state.notesPerMonth,
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWaterThunk.fulfilled, (state, { payload }) => {
        state.notes.push(payload);
      })
      .addCase(editWaterThunk.fulfilled, (state, { payload }) => {
        const index = state.notes.findIndex((note) => note._id === payload._id);
        state.notes.splice(index, 1, payload);
      })
      .addCase(deleteWaterThunk.fulfilled, (state, { payload }) => {
        state.notes = state.notes.filter((note) => note._id !== payload._id);
      })
      .addCase(fetchWaterDataTodayThunk.fulfilled, (state, { payload }) => {
        state.notes = payload.result;
        state.percent = payload.percent;
      })
      .addCase(fetchWaterDataMonthThunk.fulfilled, (state, { payload }) => {
        state.notesPerMonth = payload.result;
      });
  },
});

export const waterReducer = slice.reducer;
export const { selectNotes, selectPercent, selectNotesPerMonth } =
  slice.selectors;
