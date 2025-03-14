import { z } from 'zod';

export const answerSchema = z.object({
  id: z.number(),
  taskId: z.number(), // ID задачи, к которой привязан ответ
  content: z.string().min(1, 'Content is required'), // Текст ответа
  isCorrect: z.boolean(), // Указывает, является ли ответ правильным
});
