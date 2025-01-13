import { z } from 'zod';

export const achievementSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'), // Название достижения
  description: z.string().optional(), // Описание достижения
  type: z.enum(['level', 'questions', 'modules', 'daily', 'progress', 'streak', 'speed', 'custom']), // Тип достижения
  criteria: z.string().min(1, 'Criteria is required'), // Условие в формате JSON
  points: z.number().nonnegative().optional(), // Очки за достижение
});
