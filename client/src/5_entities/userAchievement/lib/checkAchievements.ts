import { AchievementType } from '../../achievement/model/achievement.types';
import { UserStatsType } from '../model/userStats.types';

const achievementConditions: {
  [key: string]: (criteria: string, userStats: UserStatsType) => boolean;
} = {
  level: (criteria, userStats) => {
    const requiredLevel = parseInt(criteria, 10); // Конвертируем критерий в число
    return !isNaN(requiredLevel) && userStats.level >= requiredLevel; // Проверяем, что уровень пользователя >= требуемого
  },
  answers: (criteria, userStats) => {
    const requiredAnswers = parseInt(criteria, 10);
    return !isNaN(requiredAnswers) && userStats.totalAnswers >= requiredAnswers; // Проверяем, что общее количество ответов >= требуемого
  },
};

// Функция для проверки достижений
export function checkAchievements(
  achievements: AchievementType[],
  userStats: UserStatsType,
): AchievementType[] {
  return achievements.filter((achievement) => {
    const condition = achievementConditions[achievement.type]; // Берём функцию для проверки по типу достижения

    if (!condition) {
      console.warn(`Achievement type "${achievement.type}" is not supported.`); // Логируем неподдерживаемые типы
      return false;
    }

    return condition(achievement.criteria, userStats); // Проверяем достижение
  });
}