import { createSlice } from '@reduxjs/toolkit';
import type { ProgressSliceType } from '../model/progress.types'; // Путь к типам
import {
  getTotalUserProgressThunk,
  getUserProgressByModuleThunk,
  getUserProgressByTaskThunk,
  createProgressThunk,
} from '../model/progressThunks'; // Путь к thunk

const initialState: ProgressSliceType = {
  progressTotal: [],
  progressModule: [],
  progressTask: null,
  error: null,
};

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Обработка getTotalUserProgress
      .addCase(getTotalUserProgressThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(getTotalUserProgressThunk.fulfilled, (state, action) => {
        state.progressTotal = action.payload;
      })
      .addCase(getTotalUserProgressThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Обработка getUserProgressByModule
      .addCase(getUserProgressByModuleThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserProgressByModuleThunk.fulfilled, (state, action) => {
        state.progressModule = action.payload;
      })
      .addCase(getUserProgressByModuleThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Обработка getUserProgressByTask
      .addCase(getUserProgressByTaskThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(getUserProgressByTaskThunk.fulfilled, (state, action) => {
        state.progressTask = action.payload;
      })
      .addCase(getUserProgressByTaskThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      // Обработка createProgress
      .addCase(createProgressThunk.pending, (state) => {
        state.error = null;
      })
      .addCase(createProgressThunk.fulfilled, (state, action) => {
        // Добавляем новый прогресс в общий прогресс
        state.progressTotal.push(action.payload);
      })
      .addCase(createProgressThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const progressReducer = progressSlice.reducer;
export default progressReducer;