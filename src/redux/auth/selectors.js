export const selectUser = (state) => state.auth.user;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectToken = (state) => state.auth.token;

// export const selectIsLoading = (state) => state.auth.isLoading;

export const selectIsRefreshing = (state) => state.auth.isRefresh;
export const selectWaterRate = (state) => state.auth.waterRate;
