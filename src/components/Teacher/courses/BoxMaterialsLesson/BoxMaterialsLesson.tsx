import {
  useCreateMaterialMutation,
  useDeleteMaterialMutation,
  useGetMaterialsByLessonIdQuery,
} from '@/redux/courses/materialsApi';
import { Box, List } from '@mui/material';
import { ItemFileSource } from 'components/core';
import { Lesson } from 'types/course';

import { FormAddFileTeacher } from '../FormAddFileTeacher/FormAddFileTeacher';

type BoxMaterialsLessonProps = {
  lesson: Lesson;
};

export const BoxMaterialsLesson: React.FC<BoxMaterialsLessonProps> = ({
  lesson,
}) => {
  const { data } = useGetMaterialsByLessonIdQuery({
    lessonId: lesson.id,
    courseId: lesson.courseId,
  });
  const [createMaterial] = useCreateMaterialMutation();
  const [deleteMaterial] = useDeleteMaterialMutation();

  return (
    <List>
      {data &&
        data?.data.map(item => (
          <ItemFileSource
            key={item.id}
            typeFiles="materials"
            itemSource={item}
            handleEvent={() => {
              deleteMaterial({
                id: item.id,
                lessonId: lesson.id,
                courseId: lesson.courseId,
              });
            }}
          />
        ))}
      <Box pt={2} pb={2}>
        <FormAddFileTeacher
          lesson={lesson}
          handleRequest={obj => createMaterial(obj)}
        />
      </Box>
    </List>
  );
};
