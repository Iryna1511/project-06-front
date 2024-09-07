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
  isAddWaterModalOpen: false,
  isTodayListModalOpen: false,
  isDeleteEntryOpen: false,
};

const slice = createSlice({
  name: "water",
  initialState,
  reducers: {
    toggleAddWaterModal: (state) => {
      state.isAddWaterModalOpen = !state.isAddWaterModalOpen;
    },
    toggleTodayListModal: (state) => {
      state.isTodayListModalOpen = !state.isTodayListModalOpen;
    },
    toggleDeleteEntryModal: (state) => {
      state.isDeleteEntryOpen = !state.isDeleteEntryOpen;
    },
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
        state.notesPerMonth = payload;
      });
  },
});

export const waterReducer = slice.reducer;
export const {
  toggleAddWaterModal,
  toggleTodayListModal,
  toggleDeleteEntryModal,
} = slice.actions;
