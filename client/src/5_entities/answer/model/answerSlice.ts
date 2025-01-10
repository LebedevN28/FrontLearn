import { createSlice } from '@reduxjs/toolkit';
import { AnswerSliceType } from '../model/answer.types'; // Путь к типам
import { getAnswersByTask } from '../model/answerThunks'; // Путь к thunk

const initialState: AnswerSliceType = {
  answers: [],
  status: 'idle',
  error: null,
};

const answerSlice = createSlice({
  name: 'answers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAnswersByTask.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getAnswersByTask.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.answers = action.payload;
      })
      .addCase(getAnswersByTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const answerReducer = answerSlice.reducer;
export default answerReducer;
