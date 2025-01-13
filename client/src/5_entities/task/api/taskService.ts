import { AxiosError, type AxiosInstance } from 'axios';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import type { TaskT } from '../model/types';
import { taskSchema } from '../model/schema';
import { ZodError } from 'zod';

class TaskService {
  constructor(private readonly client: AxiosInstance) {}

  async getAllTasks(): Promise<TaskT[]> {
    try {
      const response = await this.client('/tasks');
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = taskSchema.array().parse(response.data);
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

  async getTasksByModuleId(moduleId: number): Promise<TaskT[]> {
    try {
      const response = await this.client(`/tasks/module/${String(moduleId)}`);
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = taskSchema.array().parse(response.data);
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

  async getTaskById(taskId: number): Promise<TaskT> {
    try {
      const response = await this.client(`/tasks/${String(taskId)}`);
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = taskSchema.parse(response.data);
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
 
}

const taskService = new TaskService(axiosInstance);

export default taskService;
