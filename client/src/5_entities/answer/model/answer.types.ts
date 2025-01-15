import type { z } from 'zod';
import type { answerSchema } from './answer.schema';

// Тип для одной записи ответа
export type AnswerType = z.infer<typeof answerSchema>;

// Тип состояния Redux Slice для ответов
export type AnswerSliceType = {
  answers: AnswerType[]; // Список всех ответов
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Состояние загрузки
  error: string | null; // Сообщение об ошибке
};
