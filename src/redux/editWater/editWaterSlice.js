import { createSlice } from "@reduxjs/toolkit";
import { editWaterConsumption } from "./editWaterOperations";

const initialEditWaterState = {
  today: {
    waterlist: [],
  },
//   dailyDrank: 0,
  isLoading: false,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const editWaterSlice = createSlice({
  name: "water",
  initialState: initialEditWaterState,
  extraReducers: (builder) => {
    builder
      .addCase(editWaterConsumption.pending, handlePending)
      .addCase(editWaterConsumption.rejected, handleRejected)
      .addCase(editWaterConsumption.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        const array = state.today.waterlist;
        const idx = array.findIndex(item => item.id === payload.id);
        if (idx !== -1) {
          array[idx] = payload;
        }

        //для обновлення денної випитої води можливо буде потрібно 
        // state.dailyDrank = array.reduce((acc, item) => acc + item.waterVolume, 0);
      });
  },
});

export const { clearWater } = editWaterSlice.actions;
export const editWaterReducer = editWaterSlice.reducer;
