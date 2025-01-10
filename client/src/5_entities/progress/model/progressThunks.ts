import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProgressType } from '../model/progress.types'; // Путь к типам
import progressService from '../api/progressService'; // Путь к сервису

// Получить прогресс пользователя
export const getProgressByUser = createAsyncThunk<ProgressType[], number>(
  'progress/getProgressByUser',
  async (userId, { rejectWithValue }) => {
    try {
      return await progressService.getProgressByUser(userId);
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);
