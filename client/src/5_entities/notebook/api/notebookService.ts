import { AxiosError, type AxiosInstance } from 'axios';
import type { NotebookType } from '../model/types';
import { ZodError } from 'zod';
import { notebookSchema } from '../model/schema';
import axiosInstance from '../../../6_shared/api/axiosInstance';

class NotebookService {
  constructor(private readonly client: AxiosInstance) {}

  async getNotebooks(): Promise<NotebookType[]> {
    try {
      const response = await this.client('/notebooks');
      if (response.status !== 200) throw new Error('Неверный статус, ожидалось 200');
      const data = notebookSchema.array().parse(response.data);
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

const notebookService = new NotebookService(axiosInstance);

export default notebookService;
