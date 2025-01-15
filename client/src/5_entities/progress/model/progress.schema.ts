import { z } from 'zod';

export const progressSchema = z.object({
  userId: z.number(),
  taskId: z.number(),
  gotCorrect: z.boolean(),
  completedAt: z.string().datetime().nullable(), 
  createdAt: z.string().datetime(), 
  updatedAt: z.string().datetime(), 
});


export const taskProgressSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  difficulty: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  moduleId: z.number(),
  Progresses: z.array(progressSchema), 
});

