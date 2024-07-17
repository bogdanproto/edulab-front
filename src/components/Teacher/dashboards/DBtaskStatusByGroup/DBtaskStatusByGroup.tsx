import { transformDataForSelectGroupCourse } from '@/utils';
import { Box, Paper } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { SelectGroupCourse } from 'components/core';
import { useMemo, useState } from 'react';
import { DBtaskStatusByGroupDataTypes } from 'types/dashboard';

import { DBempty } from '../DBempty/DBempty';

type DBtaskStatusByGroupProps = {
  data: DBtaskStatusByGroupDataTypes | undefined;
};

export const DBtaskStatusByGroup: React.FC<DBtaskStatusByGroupProps> = ({
  data,
}) => {
  const [groupId, setGroupId] = useState<number | null>(null);
  const [courseId, setCourseId] = useState<number | null>(null);

  const pieChartData = useMemo(
    () =>
      groupId && courseId
        ? data?.[groupId]?.courses?.[courseId]?.item || []
        : [],
    [courseId, data, groupId]
  );

  if (!data) {
    return <DBempty />;
  }

  return (
    <Paper elevation={2}>
      <SelectGroupCourse
        onGroupChange={id => setGroupId(id)}
        onCourseChange={id => setCourseId(id)}
        optionsSelect={transformDataForSelectGroupCourse(data)}
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
        <PieChart series={[{ data: pieChartData }]} width={340} height={204} />
      </Box>
    </Paper>
  );
};
