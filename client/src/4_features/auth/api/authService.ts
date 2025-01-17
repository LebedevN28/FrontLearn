import type { AxiosInstance } from 'axios';
import { AxiosError } from 'axios';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import type { AuthResponseT } from '../model/auth.types';
import { ZodError } from 'zod';
import { authResponseSchema } from '../model/auth.schema';
import { signupFormSchema } from '../../../5_entities/user/model/user.schema';
import { UserLoginFormT, UserSignupFormT } from '../../../5_entities/user/model/user.types';

class AuthService {
  constructor(private readonly client: AxiosInstance) {
    this.client = client;
  }

  async signup(data: UserSignupFormT): Promise<AuthResponseT> {
    try {
      const validatedData = signupFormSchema.parse(data);
      const response = await this.client.post('/auth/signup', validatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) throw new Error('Неверный статус реги (ожидалось 200)');
      const backendAuth = authResponseSchema.parse(response.data);
      console.log('backendAuth', backendAuth);

      return backendAuth;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }
  async login(data: UserLoginFormT): Promise<AuthResponseT> {
    try {
      const response = await this.client.post('/auth/login', data);
      return authResponseSchema.parse(response.data);
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }
  async refresh(): Promise<AuthResponseT> {
    try {
      const response = await this.client.get('/tokens/refresh');
      if (response.status !== 200) throw new Error('Неверный статус рефреша (ожидалось 200)');
      const backendAuth = authResponseSchema.parse(response.data);
      return backendAuth;
    } catch (error) {
      if (error instanceof ZodError) {
        console.log('Zod error:', error.issues);
      } else if (error instanceof AxiosError) {
        console.log('Axios error:', error.response?.data);
      }
      throw error;
    }
  }

  logout(): Promise<void> {
    return this.client('/auth/logout');
  }
}

const authService = new AuthService(axiosInstance);

export default authService;
