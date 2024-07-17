import { getColorForGrade } from '@/utils';
import {
  LinearProgress,
  Typography,
  Box,
  linearProgressClasses,
  lighten,
} from '@mui/material';
import React from 'react';

interface StudentLinearProgressWithLabelProps {
  value: string | number;
}

export const StudentLinearProgressWithLabel: React.FC<
  StudentLinearProgressWithLabelProps
> = ({ value }) => {
  if (typeof value === 'string') {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 35,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
        }}
      >
        <Typography variant="caption">{value}</Typography>
      </Box>
    );
  }

  const color = getColorForGrade(value);
  const colorMap = {
    success: '#4caf50',
    primary: '#1976d2',
    warning: '#ff9800',
    error: '#f44336',
  };
  const backgroundColor = lighten(colorMap[color], 0.7);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        height: 35,
        width: '100%',
      }}
    >
      <LinearProgress
        variant="determinate"
        value={value}
        sx={{
          height: 35,
          borderRadius: 2,
          width: '100%',
          backgroundColor: backgroundColor,
          [`& .${linearProgressClasses.bar}`]: {
            backgroundColor: colorMap[color],
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2" color="black" sx={{ fontWeight: 'bold' }}>
          {Math.round(value)}
        </Typography>
      </Box>
    </Box>
  );
};
