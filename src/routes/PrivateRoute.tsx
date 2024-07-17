/* eslint-disable no-console */
import { paths } from '@/consts';
import { authApi } from '@/redux/auth/authApi';
import { authSelectors } from '@/redux/auth/authSelectors';
import { ReactNode, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Role } from 'types/role';

type PrivateProps = {
  role: Role.ADMIN | Role.TEACHER | Role.STUDENT;
  component: ReactNode;
};

const PrivateRoute: React.FC<PrivateProps> = ({
  role,
  component: Component,
}) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isTokenExist = useSelector(authSelectors.getIsTokenExist);
  const userRole = useSelector(authSelectors.getUserRole);

  const [restoreUser, { isLoading }] = authApi.useLazyRestoreUserQuery();

  useLayoutEffect(() => {
    if (!isLoggedIn && isTokenExist) {
      restoreUser();
    }
  }, [isLoggedIn, isTokenExist, restoreUser, userRole]);

  const redirectTo = (path: string) => <Navigate to={path} />;

  const baseRoleRedirectMap: { [key: string]: string } = {
    admin: paths.admin.dashboard,
    teacher: paths.teacher.dashboard,
    student: paths.student.dashboard,
  };

  // if (isError) {
  //   return <Navigate to={paths.auth.signIn} />;
  // }

  if (isLoading || (isTokenExist && !userRole)) {
    return null;
  }

  if (userRole === role) {
    return Component;
  }

  if (baseRoleRedirectMap[userRole]) {
    return redirectTo(baseRoleRedirectMap[userRole]);
  }

  return <Navigate to={paths.auth.signIn} />;
};

export default PrivateRoute;
