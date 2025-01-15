import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ProgressType, TaskProgressType } from '../model/progress.types';
import progressService from '../api/progressService';

// Получить общий прогресс пользователя
export const getTotalUserProgressThunk = createAsyncThunk<ProgressType[], number>(
  'progress/getTotalUserProgressThunk',
  async (userId, { rejectWithValue }) => {
    try {
      return await progressService.getTotalUserProgress(userId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);

// Получить прогресс пользователя по модулю
export const getUserProgressByModuleThunk = createAsyncThunk<
  TaskProgressType[],
  { userId: number; moduleId: number }
>('progress/getUserProgressByModuleThunk', async ({ userId, moduleId }, { rejectWithValue }) => {
  try {
    return await progressService.getUserProgressByModule(userId, moduleId);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

// Получить прогресс пользователя по задаче
export const getUserProgressByTaskThunk = createAsyncThunk<
  ProgressType,
  { userId: number; taskId: number }
>('progress/getUserProgressByTaskThunk', async ({ userId, taskId }, { rejectWithValue }) => {
  try {
    return await progressService.getUserProgressByTask(userId, taskId);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});

// Создать прогресс
export const createProgressThunk = createAsyncThunk<
  ProgressType,
  { userId: number; taskId: number; gotCorrect: boolean }
>('progress/createProgressThunk', async ({ userId, taskId, gotCorrect }, { rejectWithValue }) => {
  try {
    return await progressService.createProgress(userId, taskId, gotCorrect);
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
  }
});
