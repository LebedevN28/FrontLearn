import { AxiosError, type AxiosInstance } from 'axios';
import axiosInstance from '../../../6_shared/api/axiosInstance'; // Путь к axiosInstance
import { AchievementType } from '../model/achievement.types'; // Путь к типам
import { achievementSchema } from '../model/achievement.schema'; // Путь к схеме
import { ZodError } from 'zod';

class AchievementService {
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

  async getAchievements(): Promise<AchievementType[]> {
    try {
      const response = await this.client.get<AchievementType[]>('/achievements');
      return achievementSchema.array().parse(response.data);
    } catch (error) {
      this.handleError(error);
    }
  }
}

const achievementService = new AchievementService(axiosInstance);
export default achievementService;
