import { useGetTasksByUserIdQuery } from '@/redux/tasks/tasksApi';
import { getGroupedGradesData } from '@/utils';
import { Box } from '@mui/material';
import React from 'react';

import AccordionLessonsGrades from './AccordionLessonsGrades';

const StudentGrades: React.FC = () => {
  const { data: { data: courses = [] } = {}, isLoading } =
    useGetTasksByUserIdQuery();

  const groupedData = getGroupedGradesData(courses);

  return (
    !isLoading && (
      <Box>
        {Object.entries(groupedData).map(([courseTitle, lessons]) => (
          <AccordionLessonsGrades
            key={courseTitle}
            courseTitle={courseTitle}
            lessons={lessons}
          />
        ))}
      </Box>
    )
  );
};

export default StudentGrades;
