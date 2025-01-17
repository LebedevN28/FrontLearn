import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthSliceType } from './auth.types';
import { AuthStatus } from './auth.types';
import { logoutThunk, refreshThunk, signupThunk, loginThunk } from './authThunks';

const initialState: AuthSliceType = {
  data: { status: AuthStatus.fetching },
  accessToken: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Устанавливаем accessToken
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    // Очищаем accessToken
    clearAccessToken: (state) => {
      state.accessToken = '';
      state.data = {
        status: AuthStatus.guest,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.data = {
          status: AuthStatus.authenticated,
          user: action.payload.user,
        };
      })
      .addCase(signupThunk.rejected, (state) => {
        state.accessToken = '';
        state.data = {
          status: AuthStatus.guest,
        };
      })

      // Обновление токена
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.data = {
          status: AuthStatus.authenticated,
          user: action.payload.user,
        };
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.accessToken = '';
        state.data = {
          status: AuthStatus.guest,
        };
      })

      // Вход пользователя
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.data = {
          status: AuthStatus.authenticated,
          user: action.payload.user,
        };
      })
      .addCase(loginThunk.rejected, (state) => {
        state.accessToken = '';
        state.data = {
          status: AuthStatus.guest,
        };
      })

      // Выход пользователя
      .addCase(logoutThunk.fulfilled, (state) => {
        state.accessToken = '';
        state.data = {
          status: AuthStatus.guest,
        };
      });
  },
});

// Экспортируем экшены и редьюсер
export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
