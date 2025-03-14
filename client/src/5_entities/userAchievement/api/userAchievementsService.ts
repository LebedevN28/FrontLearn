import axiosInstance from '../../../6_shared/api/axiosInstance';
import { AchievementType } from '../../achievement/model/achievement.types';

class UserAchievementsService {
  // Получить список достижений пользователя
  static async getUserAchievements(userId: number): Promise<AchievementType[]> {
    const response = await axiosInstance.get(`/user-achievements/${userId}`);
    return response.data;
  }

  // Сохранить разблокированные достижения
  static async saveUserAchievements(userId: number, achievements: number[]): Promise<void> {
    await axiosInstance.post(`/user-achievements/${userId}`, { achievements });
  }
  static async checkAndUpdateAchievements(userId: number): Promise<AchievementType[]> {
    const response = await axiosInstance.get(`/user-achievements/check/${userId}`);
    return response.data;
  }
}

export default UserAchievementsService;
