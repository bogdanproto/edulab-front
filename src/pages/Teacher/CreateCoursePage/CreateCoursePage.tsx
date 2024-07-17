import { paths } from '@/consts';
import { BreadCrumbsRouter } from 'components/core';
import { FormCreateCourse } from 'components/Teacher';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateCoursePage = () => {
  const [courseId, setCourseId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseId) {
      navigate(`${paths.teacher.courses}/${courseId}`);
    }
  }, [courseId, navigate]);

  return (
    <>
      <BreadCrumbsRouter />
      <FormCreateCourse setCourseId={setCourseId} />
    </>
  );
};

export default CreateCoursePage;
