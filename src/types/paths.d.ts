export interface Paths {
  auth: {
    signIn: string;
    createPassword: string;
    invalidActivation: string;
    invalidPswResetData: string;
  };
  home: string;
  admin: {
    addStudents: string;
    dashboard: string;
    users: string;
    groups: string;
    courses: string;
    teachers: string;
    settings: string;
    account: string;
  };
  teacher: {
    dashboard: string;
    groups: string;
    groupDetails: string;
    courses: string;
    courseCreate: string;
    courseEdit: string;
    tasks: string;
    tasksCheck: string;
    tests: string;
    settings: string;
    account: string;
    testsEdit: string;
    testsView: string;
  };
  student: {
    dashboard: string;
    courses: string;
    lessons: string;
    lesson: string;
    tasks: string;
    task: string;
    grades: string;
    settings: string;
    account: string;
    tests: string;
    testsView: string;
  };
}

export type UserPathRole = 'admin' | 'teacher' | 'student';
