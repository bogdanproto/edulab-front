import { LessonTab } from 'components/core';
import { CourseTitle } from 'components/Student/Course';
import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

import StudentLessonGeneral from './StudentLessonGereral';
import StudentLessonMaterials from './StudentLessonMaterials';

const StudentLessonCard: React.FC = () => {
  const { courseId, lessonId } = useParams<{
    courseId?: string;
    lessonId?: string;
  }>();
  const location = useLocation();
  const lesson = location.state?.lesson;
  const courseTitle = location.state?.courseTitle;
  const numLessonId = Number(lessonId);
  const numCourseId = Number(courseId);

  const lessonTabs = [
    {
      key: 'General',
      content: (
        <StudentLessonGeneral
          title={lesson.title}
          description={lesson.description}
        />
      ),
    },
    {
      key: 'Materials',
      content: (
        <StudentLessonMaterials courseId={numCourseId} lessonId={numLessonId} />
      ),
    },
  ];

  return (
    <>
      <CourseTitle title={courseTitle} />
      <LessonTab tabContents={lessonTabs} />
    </>
  );
};

export default StudentLessonCard;
