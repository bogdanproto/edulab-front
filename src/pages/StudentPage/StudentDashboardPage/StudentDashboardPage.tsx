import { authSelectors } from '@/redux/auth/authSelectors';
import { dashboardStudentApi } from '@/redux/dashboard/dashboardStudentApi';
import { tasksApi } from '@/redux/tasks/tasksApi';
import { useGetUserByIdQuery } from '@/redux/users/usersApi';
import { transformTasksCollection } from '@/utils/transformTasksCollection';
import { CourseProgress } from '@/utils/transformTasksCollection';
import { CardContent, Typography, Grid, Box, Divider } from '@mui/material';
import DashboardCard from 'components/Student/DashboardCard';
import TeachersCard from 'components/Student/TeachersCard';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const StudentDashboardPage: React.FC = () => {
  const userId = useSelector(authSelectors.getUserId);
  const [getTeachers, { data: teachersInfo, isSuccess: isTeachersLoaded }] =
    dashboardStudentApi.useLazyGetStudentDashboardQuery();
  const { data: userInfo, isSuccess: isUserLoaded } = useGetUserByIdQuery(
    userId || -1
  );
  const { data = { data: [] } } = tasksApi.useGetTasksByUserIdQuery();

  let userData = null;

  if (userInfo && userInfo.data) {
    userData = userInfo.data;
  }

  useEffect(() => {
    if (isUserLoaded) {
      getTeachers(userData?.groupNames?.[0] || '');
    }
  }, [isUserLoaded, getTeachers, userData]);

  const studentName = userData?.firstName + ' ' + userData?.lastName;
  const studentGroup = userData?.groupNames?.[0] || '';

  const coursesDataCollection: CourseProgress[] = transformTasksCollection(
    data.data
  );

  return (
    <Box sx={{ p: 0.5, marginTop: '-26px' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 0,
        }}
      >
        <Typography
          variant="h4"
          color="primary.main"
          sx={{
            fontWeight: '600',
            textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.24)',
            '@media (max-width:600px)': {
              fontSize: '1.5rem',
            },
          }}
        >
          Personal Dashboard
        </Typography>
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            color: 'primary.main',
            textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.25)',
          }}
        >
          {isUserLoaded && (
            <>
              <Typography
                variant="h6"
                component="div"
                color="primary.main"
                sx={{
                  fontWeight: '600',
                  textShadow: '0.5px 0.5px 1px rgba(0, 0, 0, 0.25)',
                  '@media (max-width:600px)': {
                    fontSize: '18px',
                  },
                  whiteSpace: 'nowrap',
                }}
              >
                {studentName}
              </Typography>
              <Typography
                variant="body1"
                color="primary.main"
                sx={{
                  '@media (max-width:600px)': {
                    fontSize: '16px',
                  },
                }}
              >
                {studentGroup}
              </Typography>
            </>
          )}
        </CardContent>
      </Box>

      <Divider
        sx={{
          mt: 0,
          mb: 0,
          mr: '-8px',
          ml: '-8px',
          bgcolor: 'rgb(167, 202, 237)',
          height: '1px',
        }}
      />
      <Grid container spacing={3.5} sx={{ mt: 0 }}>
        <Grid item xs={12} md={8.5}>
          {coursesDataCollection.map((data, index) => (
            <DashboardCard key={index} data={data} />
          ))}
        </Grid>
        <Grid item xs={12} md={3.5}>
          {isTeachersLoaded && <TeachersCard data={teachersInfo?.data || []} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentDashboardPage;
