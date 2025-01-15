import { createSlice } from '@reduxjs/toolkit';
import { saveUserAchievements } from './userAchievementThunks';

// Восстанавливаем данные из localStorage, если они есть
const getInitialUnlockedAchievements = (): number[] => {
  const storedAchievements = localStorage.getItem('unlockedAchievementsIds');
  return storedAchievements ? JSON.parse(storedAchievements) : [];
};

type UserAchievementsState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  unlockedAchievementsIds: number[]; // Хранит ID разблокированных достижений
};

const initialState: UserAchievementsState = {
  status: 'idle',
  error: null,
  unlockedAchievementsIds: getInitialUnlockedAchievements(),
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

      // Сохраняем в localStorage
      localStorage.setItem(
        'unlockedAchievementsIds',
        JSON.stringify(state.unlockedAchievementsIds),
      );
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
