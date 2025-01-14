import { AxiosError, type AxiosInstance } from 'axios';
import type { ProgressType } from '../model/progress.types';
import { progressSchema } from '../model/progress.schema';
import axiosInstance from '../../../6_shared/api/axiosInstance';
import { ZodError } from 'zod';

class ProgressService {
  constructor(private readonly client: AxiosInstance) {}

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

  async getTotalUserProgress(userId: number): Promise<ProgressType[]> {
    try {
      const response = await this.client.get<ProgressType[]>(`/progress/total/${String(userId)}`);
      return progressSchema.array().parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserProgressByModule(userId: number, moduleId: number): Promise<ProgressType[]> {
    try {
      const response = await this.client.get<ProgressType[]>(
        `/progress/module/${String(userId)}/${String(moduleId)}`,
      );
      return progressSchema.array().parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async getUserProgressByTask(userId: number, taskId: number): Promise<ProgressType> {
    try {
      const response = await this.client.get<ProgressType>(
        `/progress/task/${String(userId)}/${String(taskId)}`,
      );
      return progressSchema.parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }

  async createProgress(userId: number, taskId: number, gotCorrect: boolean): Promise<ProgressType> {
    try {
      const response = await this.client.post<ProgressType>(`/progress/total/${String(userId)}`, {
        userId,
        taskId,
        gotCorrect,
      });
      return progressSchema.parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }
}

const progressService = new ProgressService(axiosInstance);
export default progressService;
