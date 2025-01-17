import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { updateUserPointsThunk } from '../../5_entities/user/model/userThunks';
import { checkAchievements } from '../../5_entities/userAchievement/lib/checkAchievements';
import { saveUserAchievements } from '../../5_entities/userAchievement/model/userAchievementThunks';
import { updateStats, updateUserPoints } from '../../5_entities/user/model/userSlice';
import { toast } from 'react-toastify';
import type { AnswerType } from '../../5_entities/answer/model/answer.types';
import { calculatePoints } from '../../6_shared/utils/pointsCalculator';
import { addUnlockedAchievements } from '../../5_entities/userAchievement/model/userAchievementsSlice';
import type { TaskT } from '../../5_entities/task/model/types';
import type { AchievementType } from '../../5_entities/achievement/model/achievement.types';
import type { UserType } from '../../5_entities/user/model/user.types';
import type { UserStatsType } from '../../5_entities/userAchievement/model/userStats.types';
import {
  createProgressThunk,
  getTotalUserProgressThunk,
  getUserProgressByModuleThunk,
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
  const unlockedAchievementIds = useAppSelector(
    (state) => state.userAchievements.unlockedAchievementsIds,
  );

  const handleAnswerClick = async (answer: AnswerType): Promise<void> => {
    // if (!thisUser || !task) {
    //   console.error('Missing user or task data.');
    //   toast.error('Unable to process the answer due to missing data.');
    //   return;
    // }

    const { id: userId } = thisUser;
    const { moduleId } = task;

    if (answer.isCorrect) {
      try {
        // Вычисляем очки за ответ
        const points = calculatePoints(task.difficulty);

        // Обновляем очки пользователя
        await dispatch(updateUserPointsThunk({ id: userId, points }));
        dispatch(updateUserPoints({ userId, points }));
        // Обновляем статистику пользователя
        const updatedStats: UserStatsType = {
          totalAnswers: (userStats?.totalAnswers || 0) + 1,
          level: Math.floor(((userStats?.totalAnswers || 0) + 1) / 10) + 1,
        };
        await dispatch(updateStats(updatedStats));

        // Проверяем новые достижения
        const newAchievements = checkAchievements(achievements, updatedStats).filter(
          (achievement) => !unlockedAchievementIds.includes(achievement.id),
        );

        if (newAchievements.length > 0) {
          // Уведомляем пользователя
          newAchievements.forEach((achievement) =>
            toast.success(`🎉 Ура, ачивка!: ${achievement.title}`),
          );

          // Добавляем достижения в глобальное состояние
          dispatch(addUnlockedAchievements(newAchievements.map((a) => a.id)));

          // Сохраняем достижения на сервере
          await dispatch(
            saveUserAchievements({
              userId,
              achievements: newAchievements.map((a) => a.id),
            }),
          );
        }
      } catch (error) {
        console.error('Error updating points or achievements:', error);
        toast.error('Failed to update user stats or achievements.');
      }
    }

    // Создаем прогресс для задачи
    try {
      await dispatch(
        createProgressThunk({
          userId,
          taskId: task.id,
          gotCorrect: answer.isCorrect,
        }),
      );

      // Обновляем прогресс пользователя
      await Promise.all([
        dispatch(getTotalUserProgressThunk(userId)),
        dispatch(getUserProgressByModuleThunk({ userId, moduleId })),
        dispatch(getUserProgressByTaskThunk({ userId, taskId: task.id })),
      ]);
    } catch (error) {
      console.error('Error creating progress:', error);
      toast.error('Failed to update progress.');
    }
  };

  return handleAnswerClick;
};
