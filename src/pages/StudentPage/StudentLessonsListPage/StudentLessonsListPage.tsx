import { BreadCrumbsRouter } from 'components/core';
import { StudentLessonsList } from 'components/Student/Lesson';

const StudentLessonsListPage = () => {
  return (
    <>
      <BreadCrumbsRouter />
      <StudentLessonsList />
    </>
  );
};

export default StudentLessonsListPage;
