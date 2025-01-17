import axiosInstance from '../../../6_shared/api/axiosInstance';
import { AchievementType } from '../model/achievement.types';
import { achievementSchema } from '../model/achievement.schema';
import { ZodError } from 'zod';

class AchievementService {
  async getAchievements(): Promise<AchievementType[]> {
    try {
      const response = await axiosInstance.get('/achievements');
      return achievementSchema.array().parse(response.data); // Валидируем через Zod
    } catch (error) {
      if (error instanceof ZodError) {
        console.error('Validation error:', error.issues);
      } else {
        console.error('Error fetching achievements:', error);
      }
      throw error; // Пробрасываем ошибку
    }
  }
}

export default new AchievementService();
