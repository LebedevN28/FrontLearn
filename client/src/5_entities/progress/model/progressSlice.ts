import { createSlice } from '@reduxjs/toolkit';
import { ProgressSliceType } from './progress.types'; // Путь к типам
import { getProgressByUser } from './progressThunks'; // Путь к thunk

const initialState: ProgressSliceType = {
  progress: [],
  status: 'idle',
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProgressByUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getProgressByUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.progress = action.payload;
      })
      .addCase(getProgressByUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const progressReducer = progressSlice.reducer;
export default progressReducer;
