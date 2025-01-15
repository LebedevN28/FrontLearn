import { createAsyncThunk } from '@reduxjs/toolkit';
import { AchievementType } from './achievement.types';
import achievementService from '../api/achievementService';

// Получить все достижения
export const getAchievements = createAsyncThunk<AchievementType[]>(
  'achievements/getAchievements',
  async () => {
    return await achievementService.getAchievements(); // Обработка ошибок в сервисе
  },
);
