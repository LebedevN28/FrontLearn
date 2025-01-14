import { AchievementType } from '../../achievement/model/achievement.types';
import { UserStatsType } from '../model/userStats.types';

// Условия для получения ачивок
const achievementConditions: {
  [key: string]: (criteria: any, userStats: UserStatsType) => boolean;
} = {
  level: (criteria: { requiredLevel: number }, userStats: UserStatsType) =>
    userStats.level >= criteria.requiredLevel,

  answers: (criteria: { requiredAnswers: number }, userStats: UserStatsType) =>
    userStats.totalAnswers >= criteria.requiredAnswers,
};
// Проверить ачивки
export function checkAchievements(
  achievements: AchievementType[],
  userStats: UserStatsType,
): AchievementType[] {
  return achievements.filter((achievement) => {
    const criteria = JSON.parse(achievement.criteria);
    const condition = achievementConditions[achievement.type];

    if (!condition) {
      console.warn(`Condition for type "${achievement.type}" is not implemented.`);
      return false; // Игнорировать достижения с неподдерживаемым типом
    }

    return condition(criteria, userStats);
  });
}
