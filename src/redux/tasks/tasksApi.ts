import { taskRoutes } from '@/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import {
  Task,
  TaskCreate,
  TaskUpdate,
  TaskGrade,
  TaskCheckData,
  ResponseTaskDetails,
} from 'types/task.d';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    getTasksByUserId: builder.query<ApiResponse<Task[]>, void>({
      query: () => `${taskRoutes.BASE}`,
      providesTags: ['Tasks'],
    }),
    getTaskById: builder.query<ApiResponse<TaskCheckData>, number>({
      query: taskId => `${taskRoutes.BASE}/${taskId}`,
      providesTags: ['Tasks'],
    }),
    getTaskForStudentById: builder.query<
      ApiResponse<ResponseTaskDetails>,
      number
    >({
      query: taskId => `${taskRoutes.BASE}/${taskId}`,
      providesTags: ['Tasks'],
    }),
    createTasksForStudentFromGroup: builder.mutation<
      ApiResponse<Task[]>,
      TaskCreate
    >({
      query: ({ groupId, courseId }) => ({
        url: `${taskRoutes.BASE}/create-task`,
        method: 'POST',
        body: { groupId, courseId },
      }),
      invalidatesTags: ['Tasks'],
    }),
    addTaskGrade: builder.mutation<ApiResponse<Task>, TaskGrade>({
      query: ({ taskId, grade }) => ({
        url: `${taskRoutes.BASE}/${taskId}`,
        method: 'PATCH',
        body: { grade },
      }),
      invalidatesTags: ['Tasks'],
    }),
    deleteTaskGrade: builder.mutation<ApiResponse<Task>, number>({
      query: taskId => ({
        url: `${taskRoutes.BASE}/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTaskStatus: builder.mutation<ApiResponse<Task>, TaskUpdate>({
      query: ({ taskId, newStatus }) => ({
        url: `${taskRoutes.BASE}/${taskId}/status`,
        method: 'PATCH',
        body: { newStatus },
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTaskGrade: builder.mutation<ApiResponse<Task>, TaskGrade>({
      query: ({ taskId, grade }) => ({
        url: `${taskRoutes.BASE}/${taskId}`,
        method: 'PATCH',
        body: { grade },
      }),
      invalidatesTags: ['Tasks'],
    }),
    sendHomework: builder.mutation({
      query: ({ taskId, file }: { taskId: string; file: File }) => {
        const formData = new FormData();
        formData.append('file', file);

        return {
          url: `/api/tasks/${taskId}/pass`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Tasks'],
    }),
  }),
});

export const {
  useGetTasksByUserIdQuery,
  useGetTaskByIdQuery,
  useCreateTasksForStudentFromGroupMutation,
  useAddTaskGradeMutation,
  useDeleteTaskGradeMutation,
  useUpdateTaskGradeMutation,
  useUpdateTaskStatusMutation,
  useSendHomeworkMutation,
  useGetTaskForStudentByIdQuery,
} = tasksApi;
