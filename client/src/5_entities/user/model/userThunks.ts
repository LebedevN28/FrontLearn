import { createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../api/userService';
import type { UserType } from './user.types';
import { z } from 'zod';
import axios, { AxiosError } from 'axios';
import { UserStatsType } from '../../userAchievement/model/userStats.types';
import axiosInstance from '../../../6_shared/api/axiosInstance';

export const getAllUsersThunk = createAsyncThunk('users/getAllUsersThunk', () =>
  userService.getUsers(),
);

export const getUserByIdThunk = createAsyncThunk('users/getUserByIdThunk', async (id: number) =>
  userService.getUserById(id),
);

export const editAccountValuesThunk = createAsyncThunk(
  'users/editAccountValuesThunk',
  async ({ id, formData }: { id: UserType['id']; formData: FormData }, { rejectWithValue }) => {
    try {
      z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
      }).parse(Object.fromEntries(formData));
      const response = await userService.editAccountValues(id, formData);
      return response;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data || 'Ошибка при изменении данных');
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  },
);

export const uploadPhotoThunk = createAsyncThunk(
  'users/uploadPhotoThunk',
  async ({ id, formData }: { id: UserType['id']; formData: FormData }) =>
    userService.uploadPhoto(id, formData),
);

export const updateUserPointsThunk = createAsyncThunk(
  'users/updateUserPointsThunk',
  async ({ id, points }: { id: UserType['id']; points: number }) => {

    const response = userService.updateUserPoints(id, points);
    return response
  }
);

export const deleteUserThunk = createAsyncThunk(
  'users/deleteUserThunk',
  async (id: UserType['id']) => {
    await userService.deleteUser(id);
  },
);

export const updateStatsThunk = createAsyncThunk(
  'user/updateStats',
  async (stats: Partial<UserStatsType>, { rejectWithValue }) => {
    try {
      // Отправляем запрос на сервер для обновления статистики
      const response = await axiosInstance.put('/user/stats', stats); // Укажите правильный endpoint
      return response.data; // Возвращаем обновленную статистику
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data?.message || 'Failed to update stats');
      }
      return rejectWithValue('An unknown error occurred');
    }
  },
);
