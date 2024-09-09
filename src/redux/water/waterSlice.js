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
  // isAddWaterModalOpen: false,
  // isTodayListModalOpen: false,
  // isDeleteEntryOpen: false, // переношу в інший слайс
};

//  {
//                 "_id": "66dc5613f5726efe41de2a73",
//                 "user_id": "66d5c83627602c09f29990f3",
//                 "date": "2024-09-07T19:30:00.000Z",
//                 "waterVolume": 510,
//                 "createdAt": "2024-09-07T13:33:07.353Z",
//                 "updatedAt": "2024-09-07T13:33:07.353Z"
//             },

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
    //Liza
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
        state.notes = payload.waterEntries;
        state.percent = payload.waterConsumptionPercentage;
      })
      .addCase(fetchWaterDataMonthThunk.fulfilled, (state, { payload }) => {
        state.notesPerMonth = payload;
      });
  },
});

export const waterReducer = slice.reducer;
// export const {
//   toggleAddWaterModal,
//   toggleTodayListModal,
//   toggleDeleteEntryModal,
// } = slice.actions; // і це перенесла
