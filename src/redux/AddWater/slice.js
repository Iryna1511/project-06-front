import { createSlice } from "@reduxjs/toolkit";
import { addWater } from "./operations";

// const handlePending = (state) => {
//   state.isLoading = true;
//   state.error = null;
// };

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const waterSlice = createSlice({
  name: "water",
  initialState: {
    today: null,
    waterList: [],
    isLoading: false,
    error: null,
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
      .addCase(addWater.pending, (state) => {
        state.error = null;
        state.isLoading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.waterList.push(action.payload);
      })
      .addCase(addWater.rejected, handleRejected);
  },
});

export const waterReducer = waterSlice.reducer;
export const {
  toggleAddWaterModal,
  toggleTodayListModal,
  toggleDeleteEntryModal,
} = waterSlice.actions;
