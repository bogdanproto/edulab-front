export type Answer = {
  id?: number;
  answerId?: number;
  answerText: string;
  isCorrect: boolean;
};

export type Question = {
  id?: number;
  questionText: string;
  questionType: TypeQuestion;
  imgUrl: string;
  answerOptions: Answer[];
};

export type Test = {
  id: number;
  title: string;
  description: string;
  maxScores: number;
  questions: Question[];
};

export type TestDesc = {
  id: number;
  title: string;
  description: string;
  maxScores: number;
  questionCount: number;
};

export type CreateTest = {
  title: string;
  description: string;
  maxScores: number;
};

export type TestResult = {
  testId: number | null;
  taskId: number | null;
  scores: number;
  status: string;
  totalQuestions: number;
  correctAnswers: number;
  answers: string;
};

export type TestResultById = {
  answers: QuestionAnswers[];
  correctAnswers: number;
  id: number | null;
  scores: number;
  status: string;
  testId: number;
  taskId: number;
  totalQuestions: number;
};

export type CreateTestResult = {
  testId: number;
  taskId: number;
  answers: QuestionAnswers[];
};

export enum TypeQuestion {
  single = 'single',
  many = 'many',
  open = 'open',
}

export type QuestionAnswers = {
  questionId: number;
  answers: {
    answerId: number;
    answerText?: string;
  }[];
};
