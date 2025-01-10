import type { z } from 'zod';
import type { achievementSchema } from '../model/achievement.schema';

// Тип для одного достижения
export type AchievementType = z.infer<typeof achievementSchema>;

// Тип состояния Redux Slice для достижений
export type AchievementSliceType = {
  achievements: AchievementType[]; // Список всех достижений
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Состояние загрузки
  error: string | null; // Сообщение об ошибке
};
