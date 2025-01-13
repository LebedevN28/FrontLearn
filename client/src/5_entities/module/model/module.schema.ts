import { z } from 'zod';

export const moduleSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  // tasks: z.array(z.number()), // IDs задач, входящих в модуль
});
