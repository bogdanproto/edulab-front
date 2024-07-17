import { courseRoutes } from '@/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import {
  Course,
  CourseCreate,
  CourseUpdate,
  CourseWLessons,
} from 'types/course';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';

export const coursesApi = createApi({
  reducerPath: 'coursesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Courses', 'Course'],

  endpoints: builder => ({
    getCourses: builder.query<ApiResponse<Course[]>, { active: boolean }>({
      query: query => `${courseRoutes.BASE}?active=${query?.active || false}`,
      providesTags: ['Courses'],
    }),

    getCoursesById: builder.query<ApiResponse<CourseWLessons>, number>({
      query: id => `${courseRoutes.BASE}/${id}`,
      providesTags: ['Course'],
    }),

    createCourse: builder.mutation<ApiResponse<Course>, CourseCreate>({
      query: ({ file, ...data }) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        if (file) {
          formData.append('file', file);
        }

        return {
          url: courseRoutes.BASE,
          method: 'POST',
          body: formData,
        };
      },

      invalidatesTags: ['Courses'],
    }),

    updateCourse: builder.mutation<ApiResponse<Course>, CourseUpdate>({
      query: ({ id, file, ...data }) => {
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, String(value));
        });

        formData.append('file', file || '');

        return {
          url: `${courseRoutes.BASE}/${id}`,
          method: 'PATCH',
          body: formData,
        };
      },

      invalidatesTags: ['Courses', 'Course'],
    }),

    deleteCourse: builder.mutation<ApiResponse<Course>, number>({
      query: id => ({
        url: `${courseRoutes.BASE}/${id}`,
        method: 'DELETE',
      }),

      invalidatesTags: ['Courses'],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCoursesByIdQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = coursesApi;
