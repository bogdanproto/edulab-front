import { baseQueryWithReauth } from '@/redux/common/baseQueryWithReauth';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import { User, UserUpdate } from 'types/user';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Users'],
  endpoints: builder => ({
    getUsers: builder.query<ApiResponse<User[]>, void>({
      query: () => ({
        url: '/api/users',
        method: 'GET',
      }),
      providesTags: result =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Users' as const, id })),
              { type: 'Users', id: 'LIST' },
            ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    getUserById: builder.query<{ data: User }, number>({
      query: id => ({
        url: `/api/users/${id}`,
        method: 'GET',
      }),
      providesTags: (_, __, id) => [{ type: 'Users', id }],
    }),
    addUser: builder.mutation<User, Omit<User, 'id'>>({
      query: body => ({
        url: '/api/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    updateUser: builder.mutation<{ data: User }, UserUpdate>({
      query: ({ file, ...data }) => {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            value.forEach(item => formData.append(`${key}[]`, item));
          } else {
            formData.append(key, String(value));
          }
        });
        if (file) {
          formData.append('file', file);
        }

        return {
          url: `/api/users/${data.id}`,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: (_, __, data) => [{ type: 'Users', id: data?.id }],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: number }, number>({
      query: id => ({
        url: `/api/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Users', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
} = usersApi;
