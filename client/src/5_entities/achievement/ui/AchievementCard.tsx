import React from 'react';
import { Card, Typography, Box } from '@mui/material';
import type { AchievementType } from '../../achievement/model/achievement.types';

interface AchievementCardProps {
  achievement: AchievementType;
  unlocked: boolean; // Показывает, разблокировано ли достижение
}

const AchievementCard: React.FC<AchievementCardProps> = ({ achievement, unlocked }) => {
  return (
    <Card
      sx={{
        padding: 2,
        backgroundColor: unlocked ? 'primary.light' : 'grey.300',
        color: unlocked ? 'primary.contrastText' : 'text.secondary',
        marginBottom: 2,
      }}
    >
      <Typography variant="h6">{achievement.title}</Typography>
      <Typography variant="body2">{achievement.description}</Typography>
      <Box sx={{ marginTop: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption">Points: {achievement.points}</Typography>
        <Typography variant="caption">{unlocked ? 'Unlocked' : 'Locked'}</Typography>
      </Box>
    </Card>
  );
};

export default AchievementCard;
