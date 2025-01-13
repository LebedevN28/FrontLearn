import { createSlice } from '@reduxjs/toolkit';
import type { AnswerSliceType } from '../model/answer.types'; 
import { getAnswersByTask } from '../model/answerThunks'; 

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

export const selectAnswers = (state: { answers: AnswerSliceType }) => state.answers.answers;
export const selectStatus = (state: { answers: AnswerSliceType }) => state.answers.status;
export const selectError = (state: { answers: AnswerSliceType }) => state.answers.error;

export const answerReducer = answerSlice.reducer;
export default answerReducer;
