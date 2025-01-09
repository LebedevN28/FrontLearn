import { createAsyncThunk } from '@reduxjs/toolkit';
import NotebookService from '../api/notebookService';

// Получить все заметки
export const getNotebooksThunk = createAsyncThunk('notes/getNotebooksThunk', () =>
  NotebookService.getNotebooks(),
);
