import { DBstudentsGradeAllocationTypes, GroupSelect } from 'types/dashboard';

export const transformDataForSelectGroupCourseBarChart = (
  data: DBstudentsGradeAllocationTypes
): GroupSelect[] => {
  return Object.entries(data).map(([id, group]) => ({
    id: Number(id),
    label: group.label,
    courses: group.courses.map(course => ({
      id: course.id,
      label: course.label,
    })),
  }));
};
