import { AxiosError, type AxiosInstance } from 'axios';
import axiosInstance from '../../../6_shared/api/axiosInstance'; // Путь к axiosInstance
import type { ProgressType } from '../model/progress.types'; // Путь к типам
import { progressSchema } from '../model/progress.schema'; // Путь к схеме
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

  async getProgressByUser(userId: number): Promise<ProgressType[]> {
    try {
      const response = await this.client.get<ProgressType[]>(`/progress?userId=${userId}`);
      return progressSchema.array().parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }
}

const progressService = new ProgressService(axiosInstance);
export default progressService;
