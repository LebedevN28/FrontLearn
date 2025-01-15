import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ProgressBar(): React.JSX.Element {
  const progress = 50; // Фиксированное значение прогресса (например, 50%)

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: '20px',
          borderRadius: '10px',
          backgroundColor: 'red', // Красный фон
          '& .MuiLinearProgress-bar': {
            backgroundColor: 'green', // Зеленая полоска прогресса
          },
        }}
      />
    </Box>
  );
}
