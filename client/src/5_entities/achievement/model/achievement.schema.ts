import { z } from 'zod';

export const achievementSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  achievementId: z.any(),
  type: z.enum(['level', 'answers']), // Убрали 'modules'
  criteria: z.string(),
  // criteria: z.string().min(1, 'Criteria is required'), 
  points: z.number().nonnegative(),
});

export type AchievementType = z.infer<typeof achievementSchema>;
