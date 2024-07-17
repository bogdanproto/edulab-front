import LoginPage from '@/pages/LoginPage';
import DashboardLayout from 'components/layout';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Role } from 'types/role.d';

import { paths } from './consts';
import {
  AccountPage,
  AddStudentsPage,
  AdminGroupsPage,
  CoursesTeacherPage,
  CreateCoursePage,
  DashboardPage,
  DashboardTeacherPage,
  EditCoursePage,
  GroupDetailsPage,
  GroupsPage,
  NotFoundPage,
  ResetPasswordPage,
  StudentCoursesPage,
  StudentGradesPage,
  StudentLessonCardPage,
  StudentLessonsListPage,
  StudentTaskPage,
  StudentTasksPage,
  StudentTestPlayerPage,
  TaskCheckPage,
  TasksPage,
  TestEditPage,
  TestPlayerPage,
  TestsConstructorPage,
  UsersPage,
  InvalidActivationPage,
  InvalidResetPasswordDataPage,
  StudentDashboardPage,
} from './pages';
import { store } from './redux/store';
import { PrivateRoute, RestrictedRoute } from './routes';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

export const router = createBrowserRouter([
  {
    path: paths.home,
    errorElement: <NotFoundPage />,
    element: <RestrictedRoute />,
  },

  {
    path: paths.admin.dashboard,
    element: <PrivateRoute role={Role.ADMIN} component={<DashboardLayout />} />,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute role={Role.ADMIN} component={<DashboardPage />} />
        ),
      },
      {
        path: paths.admin.users,
        element: <PrivateRoute role={Role.ADMIN} component={<UsersPage />} />,
      },
      {
        path: paths.admin.addStudents,
        element: (
          <PrivateRoute role={Role.ADMIN} component={<AddStudentsPage />} />
        ),
      },
      {
        path: paths.admin.groups,
        element: (
          <PrivateRoute role={Role.ADMIN} component={<AdminGroupsPage />} />
        ),
      },
      {
        path: paths.admin.account,
        element: <PrivateRoute role={Role.ADMIN} component={<AccountPage />} />,
      },
    ],
  },
  {
    path: paths.teacher.dashboard,
    element: (
      <PrivateRoute role={Role.TEACHER} component={<DashboardLayout />} />
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute
            role={Role.TEACHER}
            component={<DashboardTeacherPage />}
          />
        ),
      },
      {
        path: paths.teacher.groups,
        element: (
          <PrivateRoute role={Role.TEACHER} component={<GroupsPage />} />
        ),
      },
      {
        path: paths.teacher.groupDetails,
        element: (
          <PrivateRoute role={Role.TEACHER} component={<GroupDetailsPage />} />
        ),
      },
      {
        path: paths.teacher.courses,
        element: (
          <PrivateRoute
            role={Role.TEACHER}
            component={<CoursesTeacherPage />}
          />
        ),
      },
      {
        path: paths.teacher.tasks,
        element: <PrivateRoute role={Role.TEACHER} component={<TasksPage />} />,
      },
      {
        path: paths.teacher.tasksCheck,
        element: (
          <PrivateRoute role={Role.TEACHER} component={<TaskCheckPage />} />
        ),
      },
      {
        path: paths.teacher.courseCreate,
        element: (
          <PrivateRoute role={Role.TEACHER} component={<CreateCoursePage />} />
        ),
      },
      {
        path: paths.teacher.courseEdit,
        element: (
          <PrivateRoute role={Role.TEACHER} component={<EditCoursePage />} />
        ),
      },
      {
        path: paths.teacher.tests,
        element: (
          <PrivateRoute
            role={Role.TEACHER}
            component={<TestsConstructorPage />}
          />
        ),
      },
      {
        path: paths.teacher.testsEdit,
        element: (
          <PrivateRoute role={Role.TEACHER} component={<TestEditPage />} />
        ),
      },
      {
        path: paths.teacher.testsView,
        element: (
          <PrivateRoute role={Role.TEACHER} component={<TestPlayerPage />} />
        ),
      },
      {
        path: paths.teacher.account,
        element: (
          <PrivateRoute role={Role.TEACHER} component={<AccountPage />} />
        ),
      },
    ],
  },
  {
    path: paths.student.dashboard,
    element: (
      <PrivateRoute role={Role.STUDENT} component={<DashboardLayout />} />
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute
            role={Role.STUDENT}
            component={<StudentDashboardPage />}
          />
        ),
      },
      {
        path: paths.student.courses,
        element: (
          <PrivateRoute
            role={Role.STUDENT}
            component={<StudentCoursesPage />}
          />
        ),
      },
      {
        path: paths.student.lessons,
        element: (
          <PrivateRoute
            role={Role.STUDENT}
            component={<StudentLessonsListPage />}
          />
        ),
      },

      {
        path: paths.student.lesson,
        element: (
          <PrivateRoute
            role={Role.STUDENT}
            component={<StudentLessonCardPage />}
          />
        ),
      },
      {
        path: paths.student.tasks,
        element: (
          <PrivateRoute role={Role.STUDENT} component={<StudentTasksPage />} />
        ),
      },
      {
        path: paths.student.grades,
        element: (
          <PrivateRoute role={Role.STUDENT} component={<StudentGradesPage />} />
        ),
      },
      {
        path: paths.student.task,
        element: (
          <PrivateRoute role={Role.STUDENT} component={<StudentTaskPage />} />
        ),
      },
      {
        path: paths.student.account,
        element: (
          <PrivateRoute role={Role.STUDENT} component={<AccountPage />} />
        ),
      },
      {
        path: paths.student.testsView,
        element: (
          <PrivateRoute
            role={Role.STUDENT}
            component={<StudentTestPlayerPage />}
          />
        ),
      },
    ],
  },
  {
    path: paths.auth.signIn,
    element: <RestrictedRoute component={<LoginPage />} />,
  },
  {
    path: paths.auth.createPassword,
    element: <RestrictedRoute component={<ResetPasswordPage />} />,
  },
  {
    path: paths.auth.invalidActivation,
    element: <RestrictedRoute component={<InvalidActivationPage />} />,
  },
  {
    path: paths.auth.invalidPswResetData,
    element: <RestrictedRoute component={<InvalidResetPasswordDataPage />} />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
