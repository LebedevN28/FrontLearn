import { createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../api/authService.ts';
import { UserSignupFormT } from '../../../5_entities/user/model/user.types.ts';
import { loginFormSchema, signupFormSchema } from '../../../5_entities/user/model/user.schema.ts';

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (formData: UserSignupFormT, { dispatch, rejectWithValue }) => {
    try {
      // Валидация данных
      const validatedData = signupFormSchema.parse(formData);

      // Регистрация пользователя
      const response = await authService.signup(validatedData);

      // Автоматический вход после успешной регистрации
      const loginData = new FormData();
      loginData.append('email', validatedData.email);
      loginData.append('password', validatedData.password);

      await dispatch(loginThunk(loginData));

      return response;
    } catch (error: any) {
      console.error('Signup error:', error);

      // Обработка ошибки от сервера
      if (error.response?.data?.message) {
        return rejectWithValue(error.response.data.message);
      }

      return rejectWithValue('Ошибка при регистрации. Попробуйте снова.');
    }
  },
);

export const loginThunk = createAsyncThunk('auth/login', (formData: FormData) => {
  const data = Object.fromEntries(formData);
  return authService.login(loginFormSchema.parse(data));
});

export const logoutThunk = createAsyncThunk('auth/logoutThunk', () => authService.logout());

export const refreshThunk = createAsyncThunk('auth/refresh', () => authService.refresh());
