import { createAsyncThunk } from '@reduxjs/toolkit';
import UserAchievementsService from '../api/userAchievementsService';

// Сохранить достижения пользователя
export const saveUserAchievements = createAsyncThunk(
  'user/saveAchievements',
  async ({ userId, achievements }: { userId: number; achievements: number[] }) => {
    try {
      await UserAchievementsService.saveUserAchievements(userId, achievements);
      console.log(achievements, 'achievements');

      return achievements; // Возвращаем список сохраненных достижений
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);
