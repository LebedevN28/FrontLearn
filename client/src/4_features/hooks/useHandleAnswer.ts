import { useState } from 'react';
import { useAppDispatch } from '../../6_shared/lib/hooks';
import { updateUserPointsThunk } from '../../5_entities/user/model/userThunks';
import { checkAchievements } from '../../5_entities/userAchievement/lib/checkAchievements';
import { saveUserAchievements } from '../../5_entities/userAchievement/model/userAchievementThunks';
import { updateStats } from '../../5_entities/user/model/userSlice';
import { toast } from 'react-toastify';
import type { AnswerType } from '../../5_entities/answer/model/answer.types';
import { calculatePoints } from '../../6_shared/utils/pointsCalculator';
import type { TaskT } from '../../5_entities/task/model/types';
import type { AchievementType } from '../../5_entities/achievement/model/achievement.types';
import type { UserType } from '../../5_entities/user/model/user.types';
import type { UserStatsType } from '../../5_entities/userAchievement/model/userStats.types';
import {
  createProgressThunk,
  getTotalUserProgressThunk,
  getUserProgressByTaskThunk,
} from '../../5_entities/progress/model/progressThunks';

export const useHandleAnswer = ({
  task,
  userStats,
  thisUser,
  achievements,
}: {
  task: TaskT;
  userStats: UserStatsType;
  thisUser: UserType;
  achievements: AchievementType[];
}): ((answer: AnswerType) => Promise<void>) => {
  const dispatch = useAppDispatch();

  // Хранилище для уже разблокированных достижений
  const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<number[]>([]);

  const handleAnswerClick = async (answer: AnswerType): Promise<void> => {
    const { id } = thisUser;
    if (answer.isCorrect) {
      const points = calculatePoints(task.difficulty);

      // Обновляем очки пользователя
      dispatch(updateUserPointsThunk({ id, points })).catch(console.log);

      // Обновляем статистику пользователя
      const updatedStats = {
        totalAnswers: userStats.totalAnswers + 1,
        level: Math.floor((userStats.totalAnswers + 1) / 10) + 1, // Логика пересчета уровня
      };
      dispatch(updateStats(updatedStats));

      // Проверяем достижения
      const unlockedAchievements = checkAchievements(achievements, updatedStats).filter(
        (achievement) => !unlockedAchievementIds.includes(achievement.id), // Исключаем уже разблокированные
      );

      // Показываем уведомления и сохраняем достижения
      if (unlockedAchievements.length > 0) {
        unlockedAchievements.forEach((achievement) => {
          toast.success(`🎉 New Achievement Unlocked: ${achievement.title}`);
        });

        // Обновляем список разблокированных достижений
        setUnlockedAchievementIds((prev) => [...prev, ...unlockedAchievements.map((a) => a.id)]);

        // Сохраняем достижения
        dispatch(
          saveUserAchievements({
            userId: id,
            achievements: unlockedAchievements.map((a) => a.id),
          }),
        ).catch(console.log);
      }
    }
    // Создаем прогресс для задачи
    try {
      await dispatch(
        createProgressThunk({
          userId: id,
          taskId: task.id,
          gotCorrect: answer.isCorrect,
        }),
      ).unwrap(); // unwrap() для обработки ошибок

      // Обновляем общий прогресс пользователя
      dispatch(getTotalUserProgressThunk(id)).catch(console.log);
      dispatch(getUserProgressByTaskThunk({ userId: id, taskId: task.id })).catch(console.log);
    } catch (error) {
      console.error('Error creating progress:', error);
    }
  };

  return handleAnswerClick;
};
