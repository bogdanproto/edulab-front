import { Task } from 'types/task';

export const getGrades = (
  tasks: Task[],
  type: 'homework' | 'test'
): string | number => {
  const relevantTasks = tasks.filter(task => task.taskType === type);
  if (relevantTasks.length === 0) return 'not assigned';

  const grades = relevantTasks.map(task =>
    task.grade !== null ? task.grade : 'unrated'
  );

  return grades.join(', ') || 'No data';
};

export const calculateAverageGrade = (grades: (string | number)[]): number => {
  const numericGrades = grades.filter(
    grade => typeof grade === 'number'
  ) as number[];
  if (numericGrades.length === 0) return 0;

  const sum = numericGrades.reduce((acc, grade) => acc + grade, 0);
  const average = sum / numericGrades.length;

  return Math.round((average * 100) / 100);
};
