import { Typography } from '@mui/material';
import React from 'react';

interface CourseTitleProps {
  title: string;
}

const CourseTitle: React.FC<CourseTitleProps> = ({ title }) => {
  return (
    <Typography variant="h5" component="h2" sx={{ marginBottom: 2 }}>
      Course: {title}
    </Typography>
  );
};
export default CourseTitle;
