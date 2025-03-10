import { createSlice } from '@reduxjs/toolkit';
import type { ModuleSliceType } from './module.types';
import { getModulesThunk, getModuleById } from './moduleThunks';

const initialState: ModuleSliceType = {
  modules: [],
  selectedModule: null,
  status: 'idle',
  error: null,
};

const moduleSlice = createSlice({
  name: 'modules',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getModulesThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getModulesThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.modules = action.payload;
      })
      .addCase(getModulesThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(getModuleById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getModuleById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedModule = action.payload;
      })
      .addCase(getModuleById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const moduleReducer = moduleSlice.reducer;
export default moduleReducer;
