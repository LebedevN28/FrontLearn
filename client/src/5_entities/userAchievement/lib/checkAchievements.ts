import { AchievementType } from '../../achievement/model/achievement.types';
import { UserStatsType } from '../model/userStats.types';

// Условия для проверки достижений
const achievementConditions: {
  [key: string]: (criteria: string, userStats: UserStatsType) => boolean;
} = {
  level: (criteria, userStats) => {
    const requiredLevel = parseInt(criteria, 10);
    return !isNaN(requiredLevel) && userStats.level >= requiredLevel;
  },
  answers: (criteria, userStats) => {
    const requiredAnswers = parseInt(criteria, 10);
    return !isNaN(requiredAnswers) && userStats.totalAnswers >= requiredAnswers;
  },
};

// Функция для проверки достижений
export function checkAchievements(
  achievements: AchievementType[],
  userStats: UserStatsType,
): AchievementType[] {
  return achievements.filter((achievement) => {
    const condition = achievementConditions[achievement.type];

    if (!condition) {
      console.warn(`Achievement type "${achievement.type}" is not supported.`);
      return false;
    }

    return condition(achievement.criteria, userStats);
  });
}
