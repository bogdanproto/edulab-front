import { DBtaskStatusByGroupDataTypes, GroupSelect } from 'types/dashboard';

export const transformDataForSelectGroupCourse = (
  data: DBtaskStatusByGroupDataTypes
): GroupSelect[] => {
  return Object.entries(data).map(([groupId, group]) => ({
    label: group.label,
    id: parseInt(groupId),
    courses: Object.entries(group.courses).map(([courseId, course]) => ({
      label: course.label,
      id: parseInt(courseId),
    })),
  }));
};
