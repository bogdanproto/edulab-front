import { useGetCoursesByIdQuery } from '@/redux/courses/coursesApi';
import { BreadCrumbsRouter } from 'components/core';
import { FormCreateCourse, ListLessonTeacher } from 'components/Teacher';
import { useParams } from 'react-router-dom';

const EditCoursePage = () => {
  const { id } = useParams();

  const { data } = useGetCoursesByIdQuery(Number(id));

  return (
    <>
      <BreadCrumbsRouter />
      {data && <FormCreateCourse course={data?.data} />}
      {data && <ListLessonTeacher courseId={data?.data.id} />}
    </>
  );
};

export default EditCoursePage;
