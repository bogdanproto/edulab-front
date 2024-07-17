import { transformDataForSelectGroupCourseBarChart } from '@/utils';
import { Box, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { SelectGroupCourse } from 'components/core';
import { useMemo, useState } from 'react';
import { DBstudentsGradeAllocationTypes } from 'types/dashboard';

import { DBempty } from '../DBempty/DBempty';

type DBstudentsGradeAllocationProps = {
  data: DBstudentsGradeAllocationTypes | undefined;
};

export const DBstudentsGradeAllocation: React.FC<
  DBstudentsGradeAllocationProps
> = ({ data }) => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const [courseId, setCourseId] = useState<number | null>(null);

  const dataset = useMemo(
    () => (groupId ? data?.[groupId]?.items || [] : []),
    [data, groupId]
  );

  if (!data) {
    return <DBempty />;
  }

  return (
    <Paper elevation={2}>
      <SelectGroupCourse
        onGroupChange={id => setGroupId(id)}
        onCourseChange={id => setCourseId(id)}
        optionsSelect={transformDataForSelectGroupCourseBarChart(data)}
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
        <BarChart
          dataset={dataset}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'gradeLevel',
              tickPlacement: 'end',
              tickLabelPlacement: 'middle',
            },
          ]}
          yAxis={[
            {
              label: 'Number of students',
            },
          ]}
          series={[
            { dataKey: String(courseId), label: 'Score range', valueFormatter },
          ]}
          sx={{
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
              transform: 'translateX(-10px)',
            },
          }}
        />
      </Box>
    </Paper>
  );
};

const valueFormatter = (value: number | null) => `${value} students`;
