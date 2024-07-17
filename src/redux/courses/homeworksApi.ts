import { courseRoutes } from '@/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import {
  Homework,
  HomeworkCreate,
  LessonEntityId,
  LessonId,
} from 'types/course';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';

export const homeworksApi = createApi({
  reducerPath: 'homeworksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Homeworks'],

  endpoints: builder => ({
    getHomeworksByLessonId: builder.query<ApiResponse<Homework[]>, LessonId>({
      query: ({ courseId, lessonId }) =>
        `${courseRoutes.BASE}/${courseId}/${lessonId}/homeworks`,

      providesTags: ['Homeworks'],
    }),

    createHomework: builder.mutation<ApiResponse<Homework>, HomeworkCreate>({
      query: ({ courseId, lessonId, file, ...data }) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        formData.append('file', file);

        return {
          url: `${courseRoutes.BASE}/${courseId}/${lessonId}/homeworks`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Homeworks'],
    }),

    deleteHomework: builder.mutation<ApiResponse<Homework>, LessonEntityId>({
      query: ({ courseId, lessonId, id }) => ({
        url: `${courseRoutes.BASE}/${courseId}/${lessonId}/homeworks/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Homeworks'],
    }),
  }),
});

export const {
  useGetHomeworksByLessonIdQuery,
  useCreateHomeworkMutation,
  useDeleteHomeworkMutation,
} = homeworksApi;
