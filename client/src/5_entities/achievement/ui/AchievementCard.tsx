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
        borderRadius: 2,
        marginBottom: 2,
        backgroundColor: unlocked ? '#4caf50' : '#e0e0e0',
        color: unlocked ? '#ffffff' : '#9e9e9e',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: unlocked ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <Typography variant="h6" sx={{ marginBottom: 1 }}>
        {achievement.title}
      </Typography>
      <Typography variant="body2" sx={{ marginBottom: 2 }}>
        {achievement.description}
      </Typography>
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '0.75rem',
        }}
      >
        <Typography>Points: {achievement.points}</Typography>
        <Typography>{unlocked ? 'Unlocked' : 'Locked'}</Typography>
      </Box>
    </Card>
  );
};

export default AchievementCard;
