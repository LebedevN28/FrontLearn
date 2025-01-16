import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../6_shared/lib/hooks';
import { fetchUserAchievements } from '../../5_entities/userAchievement/model/userAchievementThunks';
import AchievementCard from '../../5_entities/achievement/ui/AchievementCard';

const AchievementsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const achievements = useAppSelector((state) => state.achievements.achievements);
  const unlockedAchievementIds = useAppSelector(
    (state) => state.userAchievements.unlockedAchievementsIds,
  );


  // Получение userId из состояния Redux
  const userId = useAppSelector((state) => state.user.selectedUser?.id);

  useEffect(() => {
    const loadAchievements = async () => {
      if (!userId) {
        setError('User ID is missing.');
        setLoading(false);
        return;
      }

      try {
        await dispatch(fetchUserAchievements(userId));
        setError(null);
      } catch (err) {
        setError('Failed to load achievements. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadAchievements();
  }, [dispatch, userId]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Your Achievements
      </Typography>
      {achievements && achievements.length > 0 ? (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 2,
          }}
        >
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              unlocked={unlockedAchievementIds.includes(achievement.id)}
            />
          ))}
        </Box>
      ) : (
        <Typography variant="body1" color="textSecondary">
          No achievements available.
        </Typography>
      )}
    </Box>
  );
};

export default AchievementsPage;
