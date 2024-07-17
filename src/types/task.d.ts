import { TestDesc, TestResult } from './tests.d';

export enum TaskStatus {
  Null = 'null',
  Done = 'done',
  Check = 'check',
}

export enum TaskType {
  Test = 'test',
  Homework = 'homework',
}

export type Task = {
  id: number;
  lessonId: number;
  studentId: number;
  status: TaskStatus;
  taskType: TaskType;
  grade: number | null;
  homeworkId?: number;
  testId?: number;
  studentName: string;
  courseTitle: string;
  lessonTitle: string;
  groupName: string;
  firstName: string;
  lastName: string;
};

export type Homework = {
  id: number;
  title: string;
  sourceURL: string;
  homeworkUrl: string;
};

export type TaskCheckData = Task & {
  homework?: Homework;
  test?: TestDesc & TestResult;
};

export type TaskCreate = {
  groupId: number;
  courseId: number;
};

export type TaskUpdate = {
  taskId: number;
  newStatus: TaskStatus;
};

export type TaskGrade = {
  taskId: number;
  grade: number;
};

export type LessonEntityId = {
  courseId: number;
  lessonId: number;
  id: number;
};

export type GradesCourse = {
  [courseTitle: string]: {
    [lessonTitle: string]: Task[];
  };
};

export type CommonTask = Pick<
  Task,
  | 'id'
  | 'lessonId'
  | 'studentId'
  | 'status'
  | 'taskType'
  | 'grade'
  | 'lessonTitle'
  | 'courseTitle'
>;

export type HomeworkDetails = {
  id: number;
  title: string;
  sourceURL: string;
  homeworkUrl: undefined | string;
};

export type TestDetails = {
  id: number;
  title: string;
  description: string;
  maxScores: number;
  scores: number;
  correctAnswers: number;
  totalQuestions: number;
};

export type ResponseHomeworkDetails = CommonTask & {
  homeworks: HomeworkDetails;
};

export type ResponseTestDetails = CommonTask & {
  test: TestDetails;
};

export type ResponseTaskDetails = ResponseHomeworkDetails | ResponseTestDetails;
