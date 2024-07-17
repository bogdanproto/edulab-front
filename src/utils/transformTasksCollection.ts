import { Task } from 'types/task';

export type CourseProgress = {
  courseTitle: string;
  totalTests: number;
  completedTests: number;
  totalHomeworks: number;
  completedHomeworks: number;
  totalTasks: number;
  completedTasks: number;
};

export function transformTasksCollection(collection: Task[]) {
  const grouped = collection.reduce<{ [key: string]: CourseProgress }>(
    (acc, item) => {
      if (!acc[item.courseTitle]) {
        acc[item.courseTitle] = {
          courseTitle: item.courseTitle,
          totalTests: 0,
          completedTests: 0,
          totalHomeworks: 0,
          completedHomeworks: 0,
          totalTasks: 0,
          completedTasks: 0,
        };
      }

      if (item.taskType === 'test') {
        acc[item.courseTitle].totalTests += 1;
        if (item.status !== 'null') {
          acc[item.courseTitle].completedTests += 1;
        }
      } else if (item.taskType === 'homework') {
        acc[item.courseTitle].totalHomeworks += 1;
        if (item.status !== 'null') {
          acc[item.courseTitle].completedHomeworks += 1;
        }
      }

      return acc;
    },
    {}
  );

  const coursesDataCollection: CourseProgress[] = Object.values(grouped).map(
    item => ({
      ...item,
      totalTasks: item.totalTests + item.totalHomeworks,
      completedTasks: item.completedTests + item.completedHomeworks,
    })
  );

  return coursesDataCollection;
}
