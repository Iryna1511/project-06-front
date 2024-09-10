export const selectLoading = (state) => state.mainWater.isLoading;
export const selectError = (state) => state.mainWater.error;

export const selectIsAddWaterMdOpen = (state) =>
  state.mainWater.isAddWaterModalOpen;
export const selectIsTodayListMdOpen = (state) =>
  state.mainWater.isTodayListModalOpen;
export const selectIsDeleteEntryOpen = (state) =>
  state.mainWater.isDeleteEntryOpen;

export const selectWaterToday = (state) =>
  state.mainWater.todayWater.waterEntries;
export const selectWaterConsumptionPercentage = (state) =>
  state.mainWater.todayWater.percent;
