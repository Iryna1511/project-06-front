import { createSlice } from "@reduxjs/toolkit";
import { fetchTodayWater } from "./irinaOperations";

const irinaWaterSlice = createSlice({
  name: "irinaWater",
  initialState: {
    todayWater: {
      percent: 0,
      waterEntries: [],
    },
    isAddWaterModalOpen: false,
    isTodayListModalOpen: false,
    isDeleteEntryOpen: false,
  },
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
      .addCase(fetchTodayWater.fulfilled, (state, action) => {
        state.todayWater.percent =
          action.payload.data.waterConsumptionPercentage;
        state.todayWater.waterEntries.push(...action.payload.data.waterEntries);
      })
      .addCase(fetchTodayWater.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const irinaWaterReducer = irinaWaterSlice.reducer;
export const {
  toggleAddWaterModal,
  toggleTodayListModal,
  toggleDeleteEntryModal,
} = irinaWaterSlice.actions;
