import { z } from 'zod';

export const noteSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
  answer: z.string(),
  notebookId: z.number(),
  userId: z.number(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const noteFormSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'Title is required'),
  content: z.string(),
  notebookId: z.number(),
  userId: z.number(),
});

