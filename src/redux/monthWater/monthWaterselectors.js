// Селектори для отримання даних з Redux стану
export const selectMonthWaterDetails = (state) => state.monthWater.month; // Отримання даних про місячне споживання води
export const selectIsLoadingMonthWater = (state) => state.monthWater.isLoading; // Отримання статусу завантаження
export const selectErrorMonthWater = (state) => state.monthWater.error; // Отримання помилки (якщо є)
