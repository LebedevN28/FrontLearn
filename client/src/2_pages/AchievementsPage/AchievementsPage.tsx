import React, { useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { fetchUserAchievements } from '../../5_entities/userAchievement/model/userAchievementThunks';
import AchievementCard from '../../5_entities/achievement/ui/AchievementCard';

const AchievementsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  // Получение списка достижений и разблокированных достижений
  const achievements = useAppSelector((state) => state.userAchievements.achievements);
  const unlockedAchievementIds = useAppSelector(
    (state) => state.userAchievements.unlockedAchievementsIds,
  );

  useEffect(() => {
    // Вызываем санку для получения достижений пользователя
    dispatch(fetchUserAchievements());
  }, [dispatch]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Achievements
      </Typography>
      <Grid container spacing={2}>
        {achievements && achievements.length > 0 ? (
          achievements.map((achievement) => (
            <Grid item xs={12} sm={6} md={4} key={achievement.id}>
              <AchievementCard
                achievement={achievement}
                unlocked={unlockedAchievementIds.includes(achievement.id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="textSecondary">
            No achievements available.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default AchievementsPage;
