import type { z } from 'zod';
import type { notebookSchema } from './schema';

export type NotebookType = z.infer<typeof notebookSchema>;

export type NotebookSliceType = {
  notebooks: NotebookType[];
  selectedNotebook: NotebookType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};
