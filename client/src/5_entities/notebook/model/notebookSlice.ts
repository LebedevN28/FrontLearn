import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NotebookType, NotebookSliceType } from './types';
import { getNotebooksThunk } from './notebookThunks';

const initialState: NotebookSliceType = {
  notebooks: [],
  selectedNotebook: null,
  status: 'idle',
  error: null,
};

export const notebookSlice = createSlice({
  name: 'notebooks',
  initialState,
  reducers: {
    setSelectedNotebook: (state, action: PayloadAction<NotebookType | null>) => {
      state.selectedNotebook = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotebooksThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNotebooksThunk.fulfilled, (state, action: PayloadAction<NotebookType[]>) => {
        state.status = 'succeeded';
        state.notebooks = action.payload;
      })
      .addCase(getNotebooksThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load notebooks';
      });
  },
});

export const { setSelectedNotebook } = notebookSlice.actions;

export default notebookSlice.reducer;
