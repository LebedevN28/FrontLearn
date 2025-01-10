import { z } from 'zod';

export const achievementSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'), // Название достижения
  description: z.string().optional(), // Описание достижения
});
