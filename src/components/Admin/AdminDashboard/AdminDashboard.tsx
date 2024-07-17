import { useGetGroupsQuery } from '@/redux/groups';
import { useGetUsersQuery } from '@/redux/users/usersApi';
import { Paper, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';

const Dashboard = () => {
  const { data: groups = [] } = useGetGroupsQuery();
  const { data: users = [] } = useGetUsersQuery();

  const totalUsers = users && 'data' in users ? users.data : [];
  const totalGroups = groups && 'data' in groups ? groups.data : [];
  const totalTeachers = totalUsers.filter(user => user.role === 'teacher');

  const totalStudents = totalUsers.filter(user => user.role === 'student');

  return (
    <Stack spacing={6}>
      <Typography variant="h3" component="h2">
        Dashboard
      </Typography>

      <Paper elevation={2}>
        <BarChart
          series={[
            {
              data: [
                totalUsers.length,
                totalTeachers.length,
                totalStudents.length,
                totalGroups.length,
              ],
            },
          ]}
          xAxis={[
            {
              scaleType: 'band',
              data: ['All Users', 'Teachers', 'Students', 'Groups'],
            },
          ]}
          height={600}
        />
      </Paper>
    </Stack>
  );
};

export default Dashboard;
