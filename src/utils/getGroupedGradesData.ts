import { Task, GradesCourse } from 'types/task';

export const getGroupedGradesData = (tasks: Task[]): GradesCourse => {
  return tasks.reduce<GradesCourse>((acc, task) => {
    const { courseTitle, lessonTitle } = task;
    if (!acc[courseTitle]) {
      acc[courseTitle] = {};
    }
    if (!acc[courseTitle][lessonTitle]) {
      acc[courseTitle][lessonTitle] = [];
    }
    acc[courseTitle][lessonTitle].push(task);

    return acc;
  }, {});
};
