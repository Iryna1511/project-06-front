export const selectUser = (state) => state.auth.user; // Використовується в хедері для отримання данних про користувача.

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

// export const selectIsLoading = (state) => state.auth.isLoading;

export const selectIsRefreshing = (state) => state.auth.isRefresh;
