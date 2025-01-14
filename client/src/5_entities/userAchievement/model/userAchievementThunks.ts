import { createAsyncThunk } from '@reduxjs/toolkit';

export const saveUserAchievements = createAsyncThunk(
  'user/saveAchievements',
  async (
    { userId, achievements }: { userId: number; achievements: number[] },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`/api/users/${userId}/achievements`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ achievements }),
      });

      if (!response.ok) {
        throw new Error('Failed to save achievements');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  },
);
