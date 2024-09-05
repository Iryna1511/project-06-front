import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'loading',
  initialState: { loading: false },
  selectors: {
    selectIsLoading: state => state.loading,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.loading = true;
        }
      )
      .addMatcher(
        action =>
          action.type.endsWith('/rejected') ||
          action.type.endsWith('/fulfilled'),
        state => {
          state.loading = false;
        }
      );
  },
});

export const loadingReducer = slice.reducer;

export const { selectIsLoading } = slice.selectors;
