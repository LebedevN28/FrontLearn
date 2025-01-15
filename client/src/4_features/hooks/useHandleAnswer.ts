import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { updateUserPointsThunk } from '../../5_entities/user/model/userThunks';
import { checkAchievements } from '../../5_entities/userAchievement/lib/checkAchievements';
import { saveUserAchievements } from '../../5_entities/userAchievement/model/userAchievementThunks';
import { updateStats } from '../../5_entities/user/model/userSlice';
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

  // Хранилище для уже разблокированных достижений
  // const [unlockedAchievementIds, setUnlockedAchievementIds] = useState<number[]>([]);

  const handleAnswerClick = async (answer: AnswerType): Promise<void> => {
    const { id } = thisUser;
    if (answer.isCorrect) {
      const points = calculatePoints(task.difficulty);

      // Обновляем очки пользователя
      dispatch(updateUserPointsThunk({ id, points })).catch(console.log);

        // Обновляем статистику пользователя
        const updatedStats: UserStatsType = {
          totalAnswers: userStats.totalAnswers + 1,
          level: Math.floor((userStats.totalAnswers + 1) / 10) + 1,
        };
        await dispatch(updateStats(updatedStats));

        // Проверяем достижения
        const newAchievements = checkAchievements(achievements, updatedStats).filter(
          (achievement) => !unlockedAchievementIds.includes(achievement.id),
        );

        if (newAchievements.length > 0) {
          // Показываем уведомления
          newAchievements.forEach((achievement) =>
            toast.success(`🎉 New Achievement Unlocked: ${achievement.title}`),
          );

          // Сохраняем в глобальное состояние
          dispatch(addUnlockedAchievements(newAchievements.map((a) => a.id)));

          // Сохраняем достижения на сервере
          await dispatch(
            saveUserAchievements({
              userId: id,
              achievements: newAchievements.map((a) => a.id),
            }),
          );
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
      console.error('Error handling answer:', error);
      toast.error('An error occurred while processing your answer.');
    }
  };

  return handleAnswerClick;
};
