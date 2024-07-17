import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';

import {
  CreateTestResult,
  Question,
  Test,
  TestResult,
  TestDesc,
  CreateTest,
  TestResultById,
} from '@/types/tests.d';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';
import { tasksApi } from '../tasks';

export const testsApi = createApi({
  reducerPath: 'testsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Tests', 'Test', 'TestResult'],
  endpoints: builder => ({
    getTests: builder.query<ApiResponse<TestDesc[]>, void>({
      query: () => `/api/tests`,
      providesTags: ['Tests'],
    }),
    getTestById: builder.query<ApiResponse<Test>, string>({
      query: id => `/api/tests/${id}`,
      providesTags: ['Test'],
    }),
    getTestByTaskId: builder.query<ApiResponse<Test>, string>({
      query: id => `/api/tests/tasks/${id}`,
      providesTags: ['Test'],
    }),
    createTest: builder.mutation<ApiResponse<Test>, CreateTest>({
      query: data => {
        return {
          url: '/api/tests',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: ['Tests'],
    }),
    updateTest: builder.mutation<
      ApiResponse<Test>,
      { testId: number; data: CreateTest }
    >({
      query: ({ testId, data }) => {
        return {
          url: `/api/tests/${testId}`,
          method: 'PUT',
          body: data,
        };
      },
      invalidatesTags: ['Tests', 'Test'],
    }),
    deleteTest: builder.mutation<ApiResponse<Test>, number>({
      query: id => {
        return {
          url: `/api/tests/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Tests'],
    }),
    addQuestion: builder.mutation({
      query: ({ file, ...data }) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === 'answerOptions') {
            formData.append(key, JSON.stringify(value));

            return;
          }

          formData.append(key, String(value));
        });

        if (file) {
          formData.append('file', file);
        }

        return {
          url: '/api/tests/questions',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Test'],
    }),
    updateQuestion: builder.mutation({
      query: ({ id, data: { file, ...data } }) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          if (key === 'answerOptions') {
            formData.append(key, JSON.stringify(value));

            return;
          }

          formData.append(key, String(value));
        });

        formData.append('file', file || '');

        return {
          url: `/api/tests/questions/${id}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: ['Test'],
    }),
    deleteQuestion: builder.mutation<ApiResponse<Question>, number>({
      query: id => {
        return {
          url: `/api/tests/questions/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Test'],
    }),
    getTestResultByTaskId: builder.query<ApiResponse<TestResultById>, string>({
      query: id => `/api/tests/results/${id}`,
      providesTags: ['TestResult'],
    }),
    addTestResult: builder.mutation<ApiResponse<TestResult>, CreateTestResult>({
      query: data => {
        return {
          url: '/api/tests/results',
          method: 'POST',
          body: data,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        await queryFulfilled;
        dispatch(tasksApi.util.invalidateTags(['Tasks']));
      },
      invalidatesTags: ['TestResult'],
    }),
    checkTestResult: builder.mutation<
      ApiResponse<TestResult>,
      CreateTestResult
    >({
      query: data => {
        return {
          url: '/api/tests/results/check',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetTestsQuery,
  useGetTestByIdQuery,
  useGetTestByTaskIdQuery,
  useGetTestResultByTaskIdQuery,
  useCreateTestMutation,
  useAddTestResultMutation,
  useCheckTestResultMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
} = testsApi;
