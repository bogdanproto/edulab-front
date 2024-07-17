import { courseRoutes } from '@/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import {
  Lesson,
  LessonCreate,
  LessonDelete,
  LessonId,
  assignTestToLesson,
} from 'types/course';
import { Test } from 'types/tests';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';

export const lessonsApi = createApi({
  reducerPath: 'lessonsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Lessons', 'Lesson', 'Tests'],

  endpoints: builder => ({
    getLessonsByCourseId: builder.query<ApiResponse<Lesson[]>, number>({
      query: courseId => `${courseRoutes.BASE}/${courseId}/lessons`,
      providesTags: ['Lessons'],
    }),

    getTestByLessonId: builder.query<ApiResponse<Test[]>, LessonId>({
      query: ({ courseId, lessonId }) =>
        `${courseRoutes.BASE}/${courseId}/lessons/${lessonId}/tests`,

      providesTags: ['Tests'],
    }),

    assignTestToLesson: builder.mutation<ApiResponse<void>, assignTestToLesson>(
      {
        query: ({ courseId, lessonId, testId }) => ({
          url: `${courseRoutes.BASE}/${courseId}/lessons/${lessonId}/addtest`,
          method: 'POST',
          body: { testId },
        }),

        invalidatesTags: ['Tests'],
      }
    ),

    removeTestFromLesson: builder.mutation<ApiResponse<void>, LessonId>({
      query: ({ courseId, lessonId }) => ({
        url: `${courseRoutes.BASE}/${courseId}/lessons/${lessonId}/removetest`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Tests'],
    }),

    createLesson: builder.mutation<ApiResponse<Lesson>, LessonCreate>({
      query: ({ courseId, ...updateData }) => ({
        url: `${courseRoutes.BASE}/${courseId}/lessons`,
        method: 'POST',
        body: updateData,
      }),

      invalidatesTags: ['Lessons'],
    }),

    updateLesson: builder.mutation<ApiResponse<Lesson>, Lesson>({
      query: ({ courseId, id, ...updateData }) => ({
        url: `${courseRoutes.BASE}/${courseId}/lessons/${id}`,
        method: 'PATCH',
        body: updateData,
      }),

      invalidatesTags: ['Lessons'],
    }),

    deleteLesson: builder.mutation<ApiResponse<Lesson>, LessonDelete>({
      query: ({ courseId, id }) => ({
        url: `${courseRoutes.BASE}/${courseId}/lessons/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Lessons'],
    }),
  }),
});

export const {
  useGetLessonsByCourseIdQuery,
  useGetTestByLessonIdQuery,
  useAssignTestToLessonMutation,
  useRemoveTestFromLessonMutation,
  useCreateLessonMutation,
  useUpdateLessonMutation,
  useDeleteLessonMutation,
} = lessonsApi;
