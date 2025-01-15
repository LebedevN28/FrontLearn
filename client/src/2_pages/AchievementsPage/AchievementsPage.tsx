import React, { useEffect } from 'react';
import { Typography, Box, Grid } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { getAchievements } from '../../5_entities/achievement/model/achievementThunks';
import AchievementCard from '../../5_entities/achievement/ui/AchievementCard';

const AchievementsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const achievements = useAppSelector((state) => state.achievements.achievements);
  const unlockedAchievementIds = useAppSelector(
    (state) => state.userAchievements.unlockedAchievementsIds,
  );

  useEffect(() => {
    dispatch(getAchievements());
  }, [dispatch]);

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Achievements
      </Typography>
      <Grid container spacing={2}>
        {achievements.map((achievement) => (
          <Grid item xs={12} sm={6} md={4} key={achievement.id}>
            <AchievementCard
              achievement={achievement}
              unlocked={unlockedAchievementIds.includes(achievement.id)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default AchievementsPage;
