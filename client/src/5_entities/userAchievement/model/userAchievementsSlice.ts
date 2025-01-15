import { createSlice } from '@reduxjs/toolkit';
import { saveUserAchievements } from './userAchievementThunks';

type UserAchievementsState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  unlockedAchievementsIds: number[]; // Хранит ID разблокированных достижений
};

const initialState: UserAchievementsState = {
  status: 'idle',
  error: null,
  unlockedAchievementsIds: [], // Изначально пустой массив
};


const userAchievementsSlice = createSlice({
  name: 'userAchievements',
  initialState,
  reducers: {
    addUnlockedAchievements(state, action: { payload: number[] }) {
      // Добавляем уникальные ID к уже разблокированным
      state.unlockedAchievementsIds = [
        ...new Set([...state.unlockedAchievementsIds, ...action.payload]),
      ];
    },
  },
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

export const { addUnlockedAchievements } = userAchievementsSlice.actions;
export const userAchievementsReducer = userAchievementsSlice.reducer;
export default userAchievementsReducer;

