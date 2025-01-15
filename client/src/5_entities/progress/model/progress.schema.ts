import { z } from 'zod';

export const progressSchema = z.object({
  id: z.number(),
  userId: z.number(),
  taskId: z.number(),
  gotCorrect: z.boolean(),
  completedAt: z.date().nullable(), 
});
