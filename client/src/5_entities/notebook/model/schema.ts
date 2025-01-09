import { z } from 'zod';

export const notebookSchema = z.object({
  id: z.number(),
  name: z.string(),
  userId: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});
