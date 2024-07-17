/* eslint-disable no-console */
import { paths } from '@/consts';
import { authApi } from '@/redux/auth/authApi';
import { authSelectors } from '@/redux/auth/authSelectors';
import { ReactNode, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type RestrictedRouteProps = {
  component?: ReactNode | null;
};

const RestrictedRoute: React.FC<RestrictedRouteProps> = ({
  component: Component = null,
}) => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const isTokenExist = useSelector(authSelectors.getIsTokenExist);
  const userRole = useSelector(authSelectors.getUserRole);

  const [restoreUser, { isLoading }] = authApi.useLazyRestoreUserQuery();

  useLayoutEffect(() => {
    if (!isLoggedIn && isTokenExist) {
      restoreUser();
    }
  }, [isLoggedIn, isTokenExist, restoreUser]);

  const redirectTo = (path: string) => <Navigate to={path} />;

  const baseRoleRedirectMap: { [key: string]: string } = {
    admin: paths.admin.dashboard,
    teacher: paths.teacher.dashboard,
    student: paths.student.dashboard,
  };

  if (isLoading) {
    return null;
  }

  if (baseRoleRedirectMap[userRole]) {
    return redirectTo(baseRoleRedirectMap[userRole]);
  }

  return Component ? Component : <Navigate to={paths.auth.signIn} />;
};

export default RestrictedRoute;
