import { AxiosError, type AxiosInstance } from 'axios';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import { TaskType } from '../model/task.types';
import { taskSchema } from '../model/task.schema';
import { ZodError } from 'zod';

class TaskService {
  constructor(private readonly client: AxiosInstance) {}

  // Метод для обработки ошибок
  private handleError(error: unknown): never {
    if (error instanceof ZodError) {
      console.error('Zod validation error:', error.issues);
    } else if (error instanceof AxiosError) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error;
  }

  // Получение всех задач
  async getTasks(): Promise<TaskType[]> {
    try {
      const response = await this.client.get<TaskType[]>('/tasks');
      if (response.status !== 200) throw new Error('Unexpected status code, expected 200');
      return taskSchema.array().parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  // Получение задачи по ID
  async getTaskById(taskId: TaskType['id']): Promise<TaskType> {
    try {
      const response = await this.client.get<TaskType>(`/tasks/${taskId}`);
      if (response.status !== 200) throw new Error('Unexpected status code, expected 200');
      return taskSchema.parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  // Создание новой задачи
  async createTask(taskData: Partial<TaskType>): Promise<TaskType> {
    try {
      const response = await this.client.post<TaskType>('/tasks', taskData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 201) throw new Error('Unexpected status code, expected 201');
      return taskSchema.parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  // Редактирование задачи
  async editTask(taskId: TaskType['id'], taskData: Partial<TaskType>): Promise<TaskType> {
    try {
      const response = await this.client.put<TaskType>(`/tasks/${taskId}`, taskData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) throw new Error('Unexpected status code, expected 200');
      return taskSchema.parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  // Удаление задачи
  async deleteTask(taskId: TaskType['id']): Promise<void> {
    try {
      const response = await this.client.delete(`/tasks/${taskId}`);
      if (response.status !== 204) throw new Error('Unexpected status code, expected 204');
    } catch (error) {
      this.handleError(error);
    }
  }
}

const taskService = new TaskService(axiosInstance);

export default taskService;
