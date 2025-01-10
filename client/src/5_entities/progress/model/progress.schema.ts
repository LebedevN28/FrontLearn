import { z } from 'zod';

export const progressSchema = z.object({
  id: z.number(),
  userId: z.number(),
  taskId: z.number(),
  status: z.enum(['completed', 'in_progress']), // Возможные статусы прогресса
  score: z.number(), // Набранные очки
  completedAt: z.string().nullable(), // Дата завершения, если применимо
});
