import { AxiosError, type AxiosInstance } from 'axios';
import { userSchema } from '../model/user.schema';
import type { UserType } from '../model/user.types';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import { ZodError } from 'zod';

class UserService {
  constructor(private readonly client: AxiosInstance) {}

  async getUsers(): Promise<UserType[]> {
    try {
      const response = await this.client('/users');
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = userSchema.array().parse(response.data);
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  async getUserById(id: number): Promise<UserType> {
    try {
      const response = await this.client(`/users/${String(id)}`);
      return userSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  async editAccountValues(id: UserType['id'], formData: FormData): Promise<UserType> {
    try {
      const response = await this.client.patch(
        `/users/${String(id)}`,
        Object.fromEntries(formData),
      );
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = userSchema.parse(response.data);
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  async uploadPhoto(id: UserType['id'], formData: FormData): Promise<UserType> {
    try {
      const response = await this.client.patch(`/users/${String(id)}/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = userSchema.parse(response.data);
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  async updateUserPoints(id: UserType['id'], points: number): Promise<UserType> {
    try {
      const response = await this.client.patch(`/users/${String(id)}/points`, { points });
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = userSchema.parse(response.data);
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  async deleteUser(id: UserType['id']): Promise<void> {
    try {
      const response = await this.client.delete(`/users/${String(id)}`);
      if (response.status !== 204) throw new Error('Неверный статус, ожидалось 204');
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }
}

const userService = new UserService(axiosInstance);

export default userService;
