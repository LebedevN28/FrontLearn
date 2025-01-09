import type { z } from 'zod';
import type { noteFormSchema, noteSchema } from './schema';

// Тип для одной заметки, на основе Zod-схемы
export type NoteType = z.infer<typeof noteSchema>;
export type NoteFormType = z.infer<typeof noteFormSchema>;

// Контекст для управления заметками
export type NotesContextValue = {
  notes: NoteType[];
  likedNotes: NoteType[];
  addNoteHandler: (formData: FormData) => Promise<void>;
  deleteNoteHandler: (noteId: NoteType['id']) => Promise<void>;
  updateNoteHandler: (noteId: NoteType['id'], data: Partial<NoteType>) => Promise<void>;
};

// Состояние Redux Slice для заметок
export type NoteSliceType = {
  notes: NoteType[];
  selectedNote: NoteType | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  likedNotes: NoteType[];
};

// Действия Redux для управления заметками
export type NoteActionType =
  | {
      type: 'ADD_NOTE';
      payload: NoteType;
    }
  | {
      type: 'DELETE_NOTE';
      payload: NoteType['id'];
    }
  | {
      type: 'UPDATE_NOTE';
      payload: { id: NoteType['id']; data: Partial<NoteType> };
    }
  | {
      type: 'SET_ALL_NOTES';
      payload: NoteType[];
    }
  | {
      type: 'SET_SELECTED_NOTE';
      payload: NoteType | null;
    };
