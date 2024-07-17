/* eslint-disable no-console */
import { authRoutes } from '@/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import {
  RegisterRequestUserData,
  RegisterResponseData,
  ImportUsersData,
  LoginResponseData,
  LoginRequestData,
  ChangePasswordRequestData,
  ChangePasswordResponseData,
  ResponseData,
  CreatePasswordRequestUserData,
  RecoverCredentialsRequestData,
} from 'types/auth';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';
import { coursesApi } from '../courses';
import { lessonsApi } from '../courses';
import { homeworksApi } from '../courses/homeworksApi';
import { materialsApi } from '../courses/materialsApi';
import { dashboardTeacherApi } from '../dashboard/dashboardTeacherApi';
import { groupsApi } from '../groups';
import { notificationsApi } from '../notifications/notificationsApi';
import { tasksApi } from '../tasks';
import { testsApi } from '../tests/testsApi';
import { usersApi } from '../users/usersApi';
import { resetAuthData, saveAuthData } from './authSlice';

const apis = {
  coursesApi,
  groupsApi,
  homeworksApi,
  lessonsApi,
  materialsApi,
  notificationsApi,
  tasksApi,
  testsApi,
  usersApi,
  dashboardTeacherApi,
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQueryWithReauth,
  endpoints: builder => ({
    register: builder.mutation<RegisterResponseData, RegisterRequestUserData>({
      query: credentials => ({
        method: 'POST',
        url: authRoutes.REGISTER,
        body: credentials,
      }),
    }),
    importUsers: builder.mutation<RegisterResponseData, ImportUsersData>({
      query: credentials => ({
        method: 'POST',
        url: authRoutes.IMPORT,
        body: credentials,
      }),
    }),
    login: builder.mutation<LoginResponseData, LoginRequestData>({
      query: credentials => ({
        method: 'POST',
        url: authRoutes.SIGNIN,
        body: credentials,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(saveAuthData(data));
      },
    }),
    logout: builder.query<ResponseData, void>({
      query: () => ({
        method: 'GET',
        url: authRoutes.LOGOUT,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(resetAuthData());
        Object.values(apis).forEach(api => dispatch(api.util.resetApiState()));
      },
    }),
    restoreUser: builder.query<LoginResponseData, void>({
      query: () => ({
        method: 'GET',
        url: authRoutes.RESTORE,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(saveAuthData(data));
      },
    }),
    refreshUser: builder.query<LoginResponseData, void>({
      query: () => ({
        method: 'GET',
        url: authRoutes.REFRESH,
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(saveAuthData(data));
      },
    }),
    changePassword: builder.mutation<
      ChangePasswordResponseData,
      ChangePasswordRequestData
    >({
      query: credentials => ({
        method: 'PATCH',
        url: authRoutes.CHANGE_PSW,
        body: credentials,
      }),
    }),
    createPassword: builder.mutation<
      ChangePasswordResponseData,
      CreatePasswordRequestUserData
    >({
      query: credentials => ({
        method: 'PATCH',
        url: authRoutes.CREATE_PSW,
        body: credentials,
      }),
    }),
    recoverCredentials: builder.mutation<
      ResponseData,
      RecoverCredentialsRequestData
    >({
      query: credentials => ({
        method: 'PATCH',
        url: authRoutes.RECOVER_PSW,
        body: credentials,
      }),
    }),
  }),
});
