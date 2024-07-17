import { calculateAverageGrade } from '@/utils';
import { getColorForGrade } from '@/utils';
import { Box } from '@mui/material';
import { Gauge } from '@mui/x-charts/Gauge';
import React from 'react';

interface AverageCourseGradeProps {
  grades: number[];
}

const AverageCourseGrade: React.FC<AverageCourseGradeProps> = ({ grades }) => {
  const averageGrade = calculateAverageGrade(grades);
  const color = getColorForGrade(averageGrade);

  return (
    <Box>
      <Gauge
        value={averageGrade}
        width={70}
        height={70}
        sx={{
          '& .MuiGauge-valueArc': {
            fill:
              color === 'success'
                ? '#4caf50'
                : color === 'primary'
                  ? '#1976d2'
                  : color === 'warning'
                    ? '#ff9800'
                    : '#f44336',
          },
          '& .MuiGauge-valueText': {
            fontSize: '1rem',
            fill: '#000',
          },
        }}
      />
    </Box>
  );
};

export default AverageCourseGrade;
