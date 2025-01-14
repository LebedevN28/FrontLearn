import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

interface ProgressBarProps {
  progress: number; // Прогресс в процентах (0-100)
}

export default function ProgressBar({ progress }: ProgressBarProps): React.JSX.Element {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: '20px',
          borderRadius: '10px',
          backgroundColor: 'red', 
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'green', 
          },
        }}
      />
    </Box>
  );
}
