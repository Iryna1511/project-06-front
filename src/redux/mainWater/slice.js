import { createSlice } from "@reduxjs/toolkit";
import {
  addWater,
  editWaterConsumption,
  fetchTodayWater,
  deleteWaterEntry,
} from "./operations";

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: {
    todayWater: {
      percent: "",
      waterEntries: [],
    },
    isLoading: false,
    error: null,
    //   dailyDrank: 0,
    isAddWaterModalOpen: false,
    isTodayListModalOpen: false,
    isDeleteEntryOpen: false,
  },
  reducers: {
    //   поки залишила ці штуки, бо у нас вони були у вотерслайсі, може комусь були потрібні
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
      //AddWater
      .addCase(addWater.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todayWater.waterEntries.push(action.payload);
      })
      .addCase(addWater.rejected, handleRejected)

      //EditWater
      .addCase(editWaterConsumption.pending, handlePending)
      .addCase(editWaterConsumption.fulfilled, (state, action) => {
        state.isLoading = false;
        const array = state.todayWater.waterEntries;
        const idx = array.findIndex((item) => item.id === action.payload.id);
        if (idx !== -1) {
          array[idx] = action.payload;
        }
        //для обновлення денної випитої води можливо буде потрібно
        // state.dailyDrank = array.reduce((acc, item) => acc + item.waterVolume, 0);
      })
      .addCase(editWaterConsumption.rejected, handleRejected)

      //Видалення води
      .addCase(deleteWaterEntry.pending, handlePending)
      .addCase(deleteWaterEntry.fulfilled, (state, action) => {
        if (state.todayWater && state.todayWater.waterEntries) {
          state.todayWater.waterEntries = state.todayWater.waterEntries.filter(
            (item) => item.id !== action.payload.id
          );
        }
      })
      .addCase(deleteWaterEntry.rejected, (state, action) => {
        state.error = {
          message: action.payload.message || "An unknown error occurred",
          status: action.payload.status,
        };
      })

      //fetchTodayWater
      .addCase(fetchTodayWater.pending, handlePending)
      .addCase(fetchTodayWater.fulfilled, (state, action) => {
        state.todayWater.percent =
          action.payload.data.waterConsumptionPercentage;
        state.todayWater.waterEntries = action.payload.data.waterEntries;
      })
      .addCase(fetchTodayWater.rejected, (state, action) => {
        state.error = {
          message: action.payload.message || "An unknown error occurred",
          status: action.payload.status,
        };
      });
  },
});

export const waterReducer = waterSlice.reducer;
export const {
  toggleAddWaterModal,
  toggleTodayListModal,
  toggleDeleteEntryModal,
} = waterSlice.actions;
