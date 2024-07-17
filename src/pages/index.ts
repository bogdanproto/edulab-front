import { lazy } from 'react';

//--------------------Common pages-----------------------
const NotFoundPage = lazy(() => import('./NotFoundPage/NotFoundPage'));
const DashboardPage = lazy(
  () => import('../components/layout/DashboardPageExample')
);

//--------------------Auth pages-----------------------
const LoginPage = lazy(() => import('./LoginPage/LoginPage'));
const AccountPage = lazy(() => import('./AccountPage/AccountPage'));
const ResetPasswordPage = lazy(
  () => import('./ResetPasswordPage/ResetPasswordPage')
);
const InvalidActivationPage = lazy(
  () => import('./InvalidActivationPage/InvalidActivationPage')
);
const InvalidResetPasswordDataPage = lazy(
  () => import('./InvalidResetPasswordDataPage/InvalidResetPasswordDataPage')
);

//--------------------Admins pages-----------------------
const AdminGroupsPage = lazy(
  () => import('./Admin/AdminGroupsPage/AdminGroupsPage')
);
const AddStudentsPage = lazy(
  () => import('./Admin/UsersPage/AddStudentsPage/AddStudentsPage')
);
const UsersPage = lazy(() => import('./Admin/UsersPage/UsersPage'));

//--------------------Teachers pages-----------------------

const CoursesTeacherPage = lazy(
  () => import('./Teacher/CoursesTeacherPage/CoursesTeacherPage')
);
const CreateCoursePage = lazy(
  () => import('./Teacher/CreateCoursePage/CreateCoursePage')
);
const EditCoursePage = lazy(
  () => import('./Teacher/EditCoursePage/EditCoursePage')
);
const DashboardTeacherPage = lazy(
  () => import('./Teacher/DashboardTeacherPage/DashboardTeacherPage')
);
const GroupDetailsPage = lazy(
  () => import('./Teacher/GroupDetailsPage/GroupDetailsPage')
);
const GroupsPage = lazy(() => import('./Teacher/GroupsPage/GroupsPage'));
const TasksPage = lazy(() => import('./Teacher/TasksPage/TasksPage'));
const TaskCheckPage = lazy(
  () => import('./Teacher/TaskCheckPage/TaskCheckPage')
);
const TestsConstructorPage = lazy(
  () => import('./Teacher/Tests/TestsConstructorPage')
);
const TestEditPage = lazy(() => import('./Teacher/Tests/TestEditPage'));
const TestPlayerPage = lazy(() => import('./Teacher/Tests/TestPlayerPage'));

//--------------------Students pages-----------------------

const StudentCoursesPage = lazy(
  () => import('./StudentPage/StudentCoursesPage/StudentCoursesPage')
);
const StudentLessonCardPage = lazy(
  () => import('./StudentPage/StudentLessonCardPage/StudentLessonCardPage')
);
const StudentLessonsListPage = lazy(
  () => import('./StudentPage/StudentLessonsListPage/StudentLessonsListPage')
);
const StudentTasksPage = lazy(
  () => import('./StudentPage/StudentTasksPage/StudentTasksPage')
);
const StudentTaskPage = lazy(
  () => import('./StudentPage/StudentTaskPage/StudentTaskPage')
);
const StudentTestPlayerPage = lazy(
  () => import('./StudentPage/StudentTestPlayerPage/StudentTestPlayerPage')
);
const StudentGradesPage = lazy(
  () => import('./StudentPage/StudentGradesPage/StudentGradesPage')
);
const StudentDashboardPage = lazy(
  () => import('./StudentPage/StudentDashboardPage/StudentDashboardPage')
);

export {
  LoginPage,
  ResetPasswordPage,
  NotFoundPage,
  DashboardPage,
  AdminGroupsPage,
  AddStudentsPage,
  UsersPage,
  AccountPage,
  CoursesTeacherPage,
  CreateCoursePage,
  EditCoursePage,
  DashboardTeacherPage,
  GroupDetailsPage,
  GroupsPage,
  TasksPage,
  TaskCheckPage,
  TestsConstructorPage,
  TestEditPage,
  TestPlayerPage,
  StudentCoursesPage,
  StudentLessonCardPage,
  StudentLessonsListPage,
  StudentTasksPage,
  StudentTaskPage,
  StudentTestPlayerPage,
  StudentGradesPage,
  InvalidActivationPage,
  InvalidResetPasswordDataPage,
  StudentDashboardPage,
};
