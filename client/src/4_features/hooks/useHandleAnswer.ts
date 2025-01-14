// hooks/useHandleAnswer.ts
import { useAppDispatch } from '../../6_shared/lib/hooks';
import { updateUserPointsThunk } from '../../5_entities/user/model/userThunks';
import { checkAchievements } from '../../5_entities/userAchievement/lib/checkAchievements';
import { saveUserAchievements } from '../../5_entities/userAchievement/model/userAchievementThunks';
import { updateStats } from '../../5_entities/user/model/userSlice';
import { toast } from 'react-toastify';
import type { AnswerType } from '../../5_entities/answer/model/answer.types';
import { calculatePoints } from '../../6_shared/utils/pointsCalculator';

export const useHandleAnswer = ({
  task,
  userStats,
  thisUser,
  achievements,
}: {
  task: any;
  userStats: any;
  thisUser: any;
  achievements: any[];
}) => {
  const dispatch = useAppDispatch();

  const handleAnswerClick = (answer: AnswerType) => {
    if (answer.isCorrect && thisUser && userStats) {
      const points = task ? calculatePoints(task.difficulty) : 0;
      const { id } = thisUser;

      // Обновляем очки пользователя
      dispatch(updateUserPointsThunk({ id, points }));

      // Обновляем статистику пользователя
      const updatedStats = {
        totalAnswers: userStats.totalAnswers + 1,
        level: Math.floor((userStats.totalAnswers + 1) / 10) + 1, // Логика пересчета уровня
      };
      dispatch(updateStats(updatedStats));

      // Проверяем достижения
      const unlockedAchievements = checkAchievements(achievements, updatedStats);

      // Показываем уведомления и сохраняем достижения
      if (unlockedAchievements.length > 0) {
        unlockedAchievements.forEach((achievement) => {
          toast.success(`🎉 New Achievement Unlocked: ${achievement.title}`);
        });

        dispatch(
          saveUserAchievements({
            userId: id,
            achievements: unlockedAchievements.map((a) => a.id),
          }),
        );
      }
    }
  };

  return handleAnswerClick;
};
