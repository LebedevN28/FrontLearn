import { createSlice } from '@reduxjs/toolkit';
import { saveUserAchievements } from './userAchievementThunks';

type UserAchievementsState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: UserAchievementsState = {
  status: 'idle',
  error: null,
};

const userAchievementsSlice = createSlice({
  name: 'userAchievements',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveUserAchievements.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(saveUserAchievements.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(saveUserAchievements.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'An unknown error occurred';
      });
  },
});

export const userAchievementsReducer = userAchievementsSlice.reducer;
export default userAchievementsReducer;
