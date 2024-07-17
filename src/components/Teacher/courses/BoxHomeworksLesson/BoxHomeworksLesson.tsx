import {
  useCreateHomeworkMutation,
  useDeleteHomeworkMutation,
  useGetHomeworksByLessonIdQuery,
} from '@/redux/courses/homeworksApi';
import { Box, List } from '@mui/material';
import { ItemFileSource } from 'components/core';
import { Lesson } from 'types/course';

import { FormAddFileTeacher } from '../FormAddFileTeacher/FormAddFileTeacher';

type BoxHomeworksLessonProps = {
  lesson: Lesson;
};

export const BoxHomeworksLesson: React.FC<BoxHomeworksLessonProps> = ({
  lesson,
}) => {
  const { data } = useGetHomeworksByLessonIdQuery({
    lessonId: lesson.id,
    courseId: lesson.courseId,
  });
  const [createHomework] = useCreateHomeworkMutation();
  const [deleteHomework] = useDeleteHomeworkMutation();

  return (
    <List>
      {data &&
        data?.data.map(item => (
          <ItemFileSource
            key={item.id}
            typeFiles="homeworks"
            itemSource={item}
            handleEvent={() => {
              deleteHomework({
                id: item.id,
                lessonId: lesson.id,
                courseId: lesson.courseId,
              });
            }}
          />
        ))}

      {data && !data?.data.length && (
        <Box pt={2} pb={2}>
          <FormAddFileTeacher
            lesson={lesson}
            handleRequest={obj => createHomework(obj)}
          />
        </Box>
      )}
    </List>
  );
};
