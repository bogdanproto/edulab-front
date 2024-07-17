import { dashboardRoutes } from '@/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import { TeacherDataForStudentDashboard } from 'types/dashboard';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';

export const dashboardStudentApi = createApi({
  reducerPath: 'studentTeacherApi',
  baseQuery: baseQueryWithReauth,

  endpoints: builder => ({
    getStudentDashboard: builder.query<
      ApiResponse<TeacherDataForStudentDashboard[]>,
      string
    >({
      query: (groupName: string) =>
        `${dashboardRoutes.STUDENT}?groupName=${groupName}`,
    }),
  }),
});
