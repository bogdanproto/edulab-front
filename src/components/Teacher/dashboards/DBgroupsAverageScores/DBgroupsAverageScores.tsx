import { Box, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { SelectItem } from 'components/core';
import { useMemo, useState } from 'react';
import { DBgroupsAverageScoresTypes } from 'types/dashboard';

import { DBempty } from '../DBempty/DBempty';

type DBgroupsAverageScoresProps = {
  data: DBgroupsAverageScoresTypes | undefined;
};

export const DBgroupsAverageScores: React.FC<DBgroupsAverageScoresProps> = ({
  data,
}) => {
  const [courseId, setCourseId] = useState<number | null>(null);

  const dataset = useMemo(() => (data ? data?.items || [] : []), [data]);

  if (!data) {
    return <DBempty />;
  }

  return (
    <Paper elevation={2}>
      <SelectItem
        label="Course"
        onChangeSelect={id => setCourseId(id)}
        options={data.courses}
      />
      <Box
        p={1}
        height={280}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {courseId && (
          <BarChart
            dataset={dataset}
            xAxis={[
              {
                scaleType: 'band',
                dataKey: 'group',
                tickPlacement: 'end',
                tickLabelPlacement: 'middle',
                colorMap: {
                  type: 'ordinal',
                  colors: ['rgb(46, 150, 255);'],
                },
              },
            ]}
            yAxis={[
              {
                label: 'Average grade',
              },
            ]}
            series={[
              {
                dataKey: String(courseId),
                label: 'Group',
                valueFormatter,
                color: 'rgb(46, 150, 255)',
              },
            ]}
            height={300}
            sx={{
              [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
              },
            }}
          />
        )}
      </Box>
    </Paper>
  );
};

const valueFormatter = (value: number | null) => `${value} average score`;
