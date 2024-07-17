import { useGetCoursesQuery } from '@/redux/courses/coursesApi';
import { Grid } from '@mui/material';
import React from 'react';

import CourseCard from '../CourseCard';

const CourseList: React.FC = () => {
  const { data: { data: courses = [] } = {}, isLoading } = useGetCoursesQuery({
    active: true,
  });

  return (
    !isLoading && (
      <Grid container spacing={2} marginTop={3}>
        {courses.map(course => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={course.id}
            sx={{
              minWidth: 275,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                zIndex: 1,
              },
            }}
          >
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default CourseList;
