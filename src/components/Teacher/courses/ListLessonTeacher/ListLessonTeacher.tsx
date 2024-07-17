import { useGetLessonsByCourseIdQuery } from '@/redux/courses';
import { Box, Button, List, Typography } from '@mui/material';
import React, { useState } from 'react';

import { AccordionNewLesson } from '../AccordionNewLesson/AccordionNewLesson';
import { ItemLessonTeacher } from '../ItemLessonTeacher/ItemLessonTeacher';

type ListLessonTeacherProps = {
  courseId: number;
};

export const ListLessonTeacher: React.FC<ListLessonTeacherProps> = ({
  courseId,
}) => {
  const [expanded, setExpanded] = useState(false);

  const { data, isFetching } = useGetLessonsByCourseIdQuery(courseId);
  const lessons = data && data.data;
  const lastOrderNumber = lessons && lessons[lessons.length - 1]?.orderNumber;

  const handleScroll = () => {
    window.scrollBy({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    setExpanded(true);
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        mt={2}
      >
        <Typography variant="h6" pb={2} pt={2}>
          Course lessons
        </Typography>
        <Button
          type="button"
          variant="contained"
          onClick={handleScroll}
          sx={{ width: { xs: '100%', sm: 'initial' } }}
        >
          Add Lesson
        </Button>
      </Box>
      <List>
        {data &&
          data.data.map(lesson => (
            <ItemLessonTeacher key={lesson.id} lesson={lesson} />
          ))}

        {!isFetching && (
          <AccordionNewLesson
            expanded={expanded}
            onChangeExpanded={() => {
              setExpanded(!expanded);
            }}
            courseId={courseId}
            lessonsOrder={(lastOrderNumber && lastOrderNumber + 1) || 1}
          />
        )}
      </List>
    </>
  );
};
