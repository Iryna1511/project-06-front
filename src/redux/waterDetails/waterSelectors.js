export const selectTodayWater = (state) => state.waterDetails.today;
export const selectMonthWater = (state) => state.waterDetails.month;
export const selectDailyDrank = (state) => state.waterDetails.dailyDrank;
export const selectIsLoadingList = (state) => state.waterDetails.isLoading;
export const selectOwnerId = (state) => state.waterDetails.ownerId;
export const selectNorma = (state) => state.dailyNorma.dailyNorma;

export const selectIsAddWaterMdOpen = (state) =>
  state.water.isAddWaterModalOpen;
export const selectIsTodayListMdOpen = (state) =>
  state.water.isTodayListModalOpen;
export const selectIsDeleteEntryOpen = (state) => state.water.isDeleteEntryOpen;
