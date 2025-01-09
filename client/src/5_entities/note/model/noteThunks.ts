import { createAsyncThunk } from '@reduxjs/toolkit';
import noteService from '../api/noteService';
import { NoteType } from './types';

// Получить все заметки
export const getAllNotesThunk = createAsyncThunk('notes/getAllNotesThunk', () =>
  noteService.getNotes(),
);

// Создать новую заметку
export const createNoteThunk = createAsyncThunk(
  'notes/createNoteThunk',
  async (formData: FormData) => {
    return await noteService.createNote(formData);
  },
);

// Удалить заметку по ID
export const deleteNoteThunk = createAsyncThunk(
  'notes/deleteNoteThunk',
  async (id: NoteType['id']) => {
    await noteService.deleteById(id);
    return id;
  },
);

// export const editNoteThunk = createAsyncThunk(
//   'book/updateBook',
//   async ({ id, formData }: { id: number; formData: FormData }) => {
//     try {
//       const response = await noteService.editNote(id, formData);
//       return response; // Возвращаем обновленные данные книги
//     } catch (error) {
//       console.error('Ошибка обновления книги:', error);
//       throw error; // Пробрасываем ошибку для обработки в UI
//     }
//   },
// );

// Редактировать заметку
export const editNoteThunk = createAsyncThunk(
  'notes/editNoteThunk',
  async ({ id, formData }: { id: NoteType['id']; formData: FormData }) => {
    if (Number.isNaN(Number(id))) {
      throw new Error('id is not a number');
    }

    // Отправка данных на сервер
    return await noteService.editNote(id, formData);
  },
);

// export const editMessageThunk = createAsyncThunk(
//   'messages/editMessageThunk',
//   async ({ id, formData }: { id: MessageType['id']; formData: FormData }) => {
//     z.object({
//       title: z.string().min(1).max(100),
//       body: z.string(),
//     }).parse(Object.fromEntries(formData));
//     if (Number.isNaN(Number(id))) {
//       throw new Error('id is not a number');
//     }
//     return messageService.editText(id, formData);
//   },
// );
