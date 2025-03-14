import { AxiosError, type AxiosInstance } from 'axios';
import axiosInstance from '../../../6_shared/api/axiosInstance'; // Путь к axiosInstance
import { AnswerType } from '../model/answer.types'; // Путь к типам
import { answerSchema } from '../model/answer.schema'; // Путь к схеме
import { ZodError } from 'zod';

class AnswerService {
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

  // Получить ответы по ID задачи
  async getAnswersByTask(taskId: number): Promise<AnswerType[]> {
    try {
      const response = await this.client.get<AnswerType[]>(`/answers?taskId=${taskId}`);
      return answerSchema.array().parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }
}

const answerService = new AnswerService(axiosInstance);
export default answerService;
