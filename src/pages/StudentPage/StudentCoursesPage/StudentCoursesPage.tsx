import { BreadCrumbsRouter } from 'components/core';
import { CourseList } from 'components/Student';

const StudentCoursesPage = () => {
  return (
    <>
      <BreadCrumbsRouter />
      <CourseList />
    </>
  );
};

export default StudentCoursesPage;
