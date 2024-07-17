import { dashboardRoutes } from '@/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import { DashboardConsolidationTeacher } from 'types/dashboard';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';

export const dashboardTeacherApi = createApi({
  reducerPath: 'dashboardTeacherApi',
  baseQuery: baseQueryWithReauth,

  endpoints: builder => ({
    getTeacherDashboard: builder.query<
      ApiResponse<DashboardConsolidationTeacher>,
      void
    >({
      query: () => `${dashboardRoutes.TEACHER}`,
    }),
  }),
});

export const { useGetTeacherDashboardQuery } = dashboardTeacherApi;
