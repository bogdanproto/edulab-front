import { BreadCrumbsRouter } from 'components/core';
import { StudentGrades } from 'components/Student/Grades';

const StudentGradesPage = () => {
  return (
    <>
      <BreadCrumbsRouter />
      <StudentGrades />
    </>
  );
};

export default StudentGradesPage;
