import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const slice = createSlice({
  name: 'error',
  initialState: { error: null },

  extraReducers: builder => {
    builder
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, { payload }) => {
          state.error = payload
            ? payload.message || payload
            : 'An error occurred';
          toast.error(state.error);
        }
      )
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.error = null;
        }
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        state => {
          state.error = null;
        }
      );
  },
});

export const errorReducer = slice.reducer;
