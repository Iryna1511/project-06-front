export const selectLoading = (state) => state.water.isLoading;
export const selectWaterList = (state) => state.water.todayWater.waterEntries;

export const selectIsAddWaterMdOpen = (state) =>
  state.water.isAddWaterModalOpen;
export const selectIsTodayListMdOpen = (state) =>
  state.water.isTodayListModalOpen;
export const selectIsDeleteEntryOpen = (state) => state.water.isDeleteEntryOpen;

export const selectWaterToday = (state) =>
  state.water.todayWater?.waterEntries || [];

export const selectWaterConsumptionPercentage = (state) => state.water.percent;
