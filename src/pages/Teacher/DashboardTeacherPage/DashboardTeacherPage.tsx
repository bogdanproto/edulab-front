import { useGetTeacherDashboardQuery } from '@/redux/dashboard/dashboardTeacherApi';
import { Box, Grid } from '@mui/material';
import {
  DBTaskForCheck,
  DBgroupsAverageScores,
  DBstudentsGradeAllocation,
  DBtaskStatusByGroup,
} from 'components/Teacher';

const DashboardTeacherPage = () => {
  const { data } = useGetTeacherDashboardQuery();

  const dbTaskStatusByGroupData = data && data?.data?.dbTaskStatusByGroup;
  const dbTaskForCheckData = data && data?.data?.dbTaskForCheck;
  const dbstudentsGradeAllocationData =
    data && data?.data?.dbStudentsGradeAllocation;
  const dbGroupsAverageScores = data && data?.data?.dbGroupsAverageScores;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DBtaskStatusByGroup data={dbTaskStatusByGroupData || undefined} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DBTaskForCheck data={dbTaskForCheckData} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DBstudentsGradeAllocation
            data={dbstudentsGradeAllocationData || undefined}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DBgroupsAverageScores data={dbGroupsAverageScores || undefined} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardTeacherPage;
