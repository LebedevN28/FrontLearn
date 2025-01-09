import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NoteType, NoteSliceType } from '../model/types';
import { getAllNotesThunk, deleteNoteThunk, createNoteThunk, editNoteThunk } from './noteThunks';

const initialState: NoteSliceType = {
  notes: [],
  likedNotes: [],
  selectedNote: null,
  status: 'idle',
  error: null,
};

export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    setAllNotes: (state, action: PayloadAction<NoteType[]>) => {
      state.notes = action.payload;
    },
    addNote: (state, action: PayloadAction<NoteType>) => {
      state.notes.unshift(action.payload);
    },
    deleteNote: (state, action: PayloadAction<number>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      state.likedNotes = state.likedNotes.filter((note) => note.id !== action.payload);
    },
    setSelectedNote: (state, action: PayloadAction<NoteType | null>) => {
      state.selectedNote = action.payload;
    },
    toggleLikeNote: (state, action: PayloadAction<NoteType>) => {
      const likedIndex = state.likedNotes.findIndex((n) => n.id === action.payload.id);
      if (likedIndex !== -1) {
        state.likedNotes.splice(likedIndex, 1);
      } else {
        state.likedNotes.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotesThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getAllNotesThunk.fulfilled, (state, action: PayloadAction<NoteType[]>) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(getAllNotesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load notes';
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action: PayloadAction<number>) => {
        state.notes = state.notes.filter((note) => note.id !== action.payload);
        state.likedNotes = state.likedNotes.filter((note) => note.id !== action.payload);
      })
      .addCase(createNoteThunk.fulfilled, (state, action: PayloadAction<NoteType>) => {
        state.notes.unshift(action.payload);
      })
      .addCase(editNoteThunk.fulfilled, (state, action: PayloadAction<NoteType>) => {
        const index = state.notes.findIndex((note) => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload; // Обновляем заметку в массиве
        }

        // Обновляем в избранных, если заметка там есть
        const likedIndex = state.likedNotes.findIndex((note) => note.id === action.payload.id);
        if (likedIndex !== -1) {
          state.likedNotes[likedIndex] = action.payload;
        }
      })

      .addCase(editNoteThunk.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка изменения заметки';
      });
  },
});

export const { setAllNotes, addNote, deleteNote, setSelectedNote, toggleLikeNote } =
  noteSlice.actions;

export default noteSlice.reducer;
