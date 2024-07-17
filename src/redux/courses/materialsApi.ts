import { courseRoutes } from '@/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import {
  LessonId,
  Material,
  MaterialCreate,
  LessonEntityId,
} from 'types/course';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';

export const materialsApi = createApi({
  reducerPath: 'materialsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Materials'],

  endpoints: builder => ({
    getMaterialsByLessonId: builder.query<ApiResponse<Material[]>, LessonId>({
      query: ({ courseId, lessonId }) =>
        `${courseRoutes.BASE}/${courseId}/${lessonId}/materials`,

      providesTags: ['Materials'],
    }),

    createMaterial: builder.mutation<ApiResponse<Material>, MaterialCreate>({
      query: ({ courseId, lessonId, file, ...data }) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        formData.append('file', file);

        return {
          url: `${courseRoutes.BASE}/${courseId}/${lessonId}/materials`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Materials'],
    }),

    deleteMaterial: builder.mutation<ApiResponse<Material>, LessonEntityId>({
      query: ({ courseId, lessonId, id }) => ({
        url: `${courseRoutes.BASE}/${courseId}/${lessonId}/materials/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Materials'],
    }),
  }),
});

export const {
  useGetMaterialsByLessonIdQuery,
  useCreateMaterialMutation,
  useDeleteMaterialMutation,
} = materialsApi;
