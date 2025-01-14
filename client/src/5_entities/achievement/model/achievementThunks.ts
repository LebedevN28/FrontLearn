import { createAsyncThunk } from '@reduxjs/toolkit';
import { AchievementType } from '../model/achievement.types'; // Путь к типам
import achievementService from '../api/achievementService'; // Путь к сервису

// Получить все достижения
export const getAchievements = createAsyncThunk<AchievementType[]>(
  'achievements/getAchievements',
  async (_, { rejectWithValue }) => {
    try {
      return await achievementService.getAchievements();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);
