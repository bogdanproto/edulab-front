import {
  useAssignTestToLessonMutation,
  useGetTestByLessonIdQuery,
  useRemoveTestFromLessonMutation,
} from '@/redux/courses';
import { useGetTestsQuery } from '@/redux/tests/testsApi';
import { prepareDataForAutoComplete } from '@/utils';
import { List } from '@mui/material';
import { ItemSource } from 'components/core';
import { Lesson } from 'types/course';

import { FormAddTestToLesson } from '../FormAddTestToLesson/FormAddTestToLesson';

type BoxTestsLessonrops = {
  lesson: Lesson;
};

export const BoxTestsLesson: React.FC<BoxTestsLessonrops> = ({ lesson }) => {
  const { data } = useGetTestsQuery();
  const { data: relatedTest } = useGetTestByLessonIdQuery({
    lessonId: lesson.id,
    courseId: lesson.courseId,
  });

  const [assignTestToLesson] = useAssignTestToLessonMutation();
  const [removeTestFromLesson] = useRemoveTestFromLessonMutation();

  const isTestExisted = relatedTest?.data && relatedTest.data?.length > 0;

  return (
    <>
      {isTestExisted ? (
        <List>
          <ItemSource
            item={relatedTest?.data[0]}
            typeFiles="test"
            handleEvent={() => {
              removeTestFromLesson({
                lessonId: lesson.id,
                courseId: lesson.courseId,
              });
            }}
          />
        </List>
      ) : (
        <FormAddTestToLesson
          list={prepareDataForAutoComplete(data?.data) || []}
          lesson={lesson}
          handleRequest={obj => assignTestToLesson(obj)}
        />
      )}
    </>
  );
};
