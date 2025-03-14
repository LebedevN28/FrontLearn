import { z } from 'zod';

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  type: z.enum(['multiple_choice', 'text_input']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  moduleId: z.number().int(),

});
