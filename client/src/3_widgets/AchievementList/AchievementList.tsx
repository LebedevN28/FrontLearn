import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { getAchievements } from '../../5_entities/achievement/model/achievementThunks';

export default function AchievementList(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { achievements, status, error } = useAppSelector((state) => state.achievements);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getAchievements());
    }
  }, [dispatch, status]);

  if (status === 'loading') {
    return <p>Загрузка достижений...</p>;
  }

  if (error) {
    return <p>Ошибка загрузки: {error}</p>;
  }

  return (
    <div>
      <h1>Достижения</h1>
      <ul>
        {achievements.map((achievement) => (
          <li key={achievement.id}>
            <h3>{achievement.title}</h3>
            <p>{achievement.description}</p>
            <p>Условие: {achievement.criteria}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
