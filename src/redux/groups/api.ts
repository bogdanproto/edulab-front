import { baseQueryWithReauth } from '@/redux/common/baseQueryWithReauth';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import { Course } from 'types/course';
import { Group } from 'types/group';
import { Student } from 'types/student';

export const groupsApi = createApi({
  reducerPath: 'groupsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['GroupCourses', 'Groups', 'GroupStudents'],
  endpoints: builder => ({
    getGroups: builder.query<ApiResponse<Group[]>, void>({
      query: () => 'api/groups',
      providesTags: ['Groups'],
    }),
    getGroupStudents: builder.query<ApiResponse<Student[]>, string>({
      query: id => `api/groups/${id}/students`,
      providesTags: ['GroupStudents'],
    }),
    getGroupCourses: builder.query<ApiResponse<Course[]>, string>({
      query: id => `api/groups/${id}/courses`,
      providesTags: ['GroupCourses'],
    }),
    assignCourse: builder.mutation<
      void,
      { groupId: string; courseIds: number[] }
    >({
      query: ({ groupId, courseIds }) => {
        return {
          url: `/api/groups/${groupId}/courses`,
          method: 'PATCH',
          body: courseIds,
        };
      },
      invalidatesTags: ['GroupCourses'],
    }),
    addGroup: builder.mutation<ApiResponse<Group>, Partial<Group>>({
      query: body => ({
        url: '/api/groups',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Groups'],
    }),
    updateGroup: builder.mutation<ApiResponse<Group>, Partial<Group>>({
      query: group => {
        const { id, ...body } = group;

        return {
          url: `/api/groups/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: ['Groups'],
    }),
    deleteGroup: builder.mutation<void, string>({
      query: id => ({
        url: `/api/groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Groups'],
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGroupStudentsQuery,
  useAssignCourseMutation,
  useGetGroupCoursesQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
