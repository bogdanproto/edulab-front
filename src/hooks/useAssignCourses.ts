import { useGetCoursesQuery } from '@/redux/courses/coursesApi';
import {
  useAssignCourseMutation,
  useGetGroupCoursesQuery,
} from '@/redux/groups';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Course } from 'types/course';

export const useAssignCourses = () => {
  const { id } = useParams();
  const { data: allCourses = { data: [] }, isLoading: isAllLoading } =
    useGetCoursesQuery({ active: true });
  const { data: assignedCourses = { data: [] }, isLoading: isAssignedLoading } =
    useGetGroupCoursesQuery(id!);
  const [assignCourses] = useAssignCourseMutation();
  const [newAssignedCourses, setNewAssignedCourses] = useState<Course[]>(
    assignedCourses.data
  );

  useEffect(() => {
    if (!isAssignedLoading) setNewAssignedCourses(assignedCourses.data);
  }, [assignedCourses.data, isAssignedLoading]);

  const onChange = (_event: unknown, newVal: Course[]) =>
    setNewAssignedCourses(newVal);

  const handleAssign = () => {
    assignCourses({
      groupId: id!,
      courseIds: newAssignedCourses.map(course => course.id),
    });
    setNewAssignedCourses(assignedCourses.data);
  };

  return {
    options: allCourses.data,
    selected: newAssignedCourses,
    handleAssign,
    onChange,
    isLoading: isAllLoading || isAssignedLoading,
  };
};
