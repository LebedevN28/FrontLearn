import { createAsyncThunk } from '@reduxjs/toolkit';
import UserAchievementsService from '../api/userAchievementsService';

// Сохранить достижения пользователя
export const saveUserAchievements = createAsyncThunk(
  'userAchievements/saveUserAchievements',
  async (
    { userId, achievements }: { userId: number; achievements: number[] },
    { rejectWithValue },
  ) => {
    try {
      await UserAchievementsService.saveUserAchievements(userId, achievements);
      return achievements; // Возвращаем список сохраненных достижений
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return rejectWithValue(errorMessage);
    }
  },
);

// Получить достижения пользователя
export const fetchUserAchievements = createAsyncThunk(
  'userAchievements/fetchUserAchievements',
  async (userId: number, { rejectWithValue }) => {
    try {
      const achievements = await UserAchievementsService.getUserAchievements(userId);
      return achievements; // Возвращаем полученные достижения
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return rejectWithValue(errorMessage);
    }
  },
);

// Проверить достижения пользователя на сервере
export const checkUserAchievements = createAsyncThunk(
  'userAchievements/checkUserAchievements',
  async (userId: number, { rejectWithValue }) => {
    try {
      const newAchievements = await UserAchievementsService.checkAndUpdateAchievements(userId);
      return newAchievements; // Возвращаем новые разблокированные достижения
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return rejectWithValue(errorMessage);
    }
  },
);
