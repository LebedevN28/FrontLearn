import { z } from 'zod';

// Схема для статистики пользователя
export const userStatsSchema = z.object({
  level: z.number().nonnegative(), // Уровень пользователя
  totalAnswers: z.number().nonnegative(), // Общее количество ответов
});

// Тип для статистики пользователя
export type UserStatsType = z.infer<typeof userStatsSchema>;
