import type { z } from 'zod';
import type { moduleSchema } from './module.schema';

// Тип для одного модуля
export type ModuleType = z.infer<typeof moduleSchema>;

// Тип состояния Redux Slice для модулей
export type ModuleSliceType = {
  modules: ModuleType[]; // Список всех модулей
  selectedModule: ModuleType | null; // Текущий выбранный модуль
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Состояние загрузки
  error: string | null; // Сообщение об ошибке
};
