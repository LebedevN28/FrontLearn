import { z } from 'zod';

export const taskSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.enum(['multiple_choice', 'text_input']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export const taskFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  type: z.enum(['multiple_choice', 'text_input']),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});
