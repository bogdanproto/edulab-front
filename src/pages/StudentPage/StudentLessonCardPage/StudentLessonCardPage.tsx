import { BreadCrumbsRouter } from 'components/core';
import { StudentLessonCard } from 'components/Student/Lesson';

const StudentLessonCardPage = () => {
  return (
    <>
      <BreadCrumbsRouter />
      <StudentLessonCard />
    </>
  );
};

export default StudentLessonCardPage;
