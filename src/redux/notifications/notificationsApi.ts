import { notificationRoutes } from '@/consts';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse } from 'types/apiResponse';
import {
  Init,
  NotificationReq,
  NotificationRes,
  NotificationStatus,
  NotificationStatusReq,
  NotificationStatusRes,
} from 'types/notification.d';

import { baseQueryWithReauth } from '../common/baseQueryWithReauth';

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['NotificationStatus'],

  endpoints: builder => ({
    getQntNotificationByStatus: builder.query<
      ApiResponse<NotificationStatusRes>,
      NotificationStatusReq
    >({
      query: ({ status }) => `${notificationRoutes.BASE}/${status}`,
      providesTags: ['NotificationStatus'],
    }),

    getNotifications: builder.query<
      ApiResponse<NotificationRes>,
      NotificationReq
    >({
      query: ({ cursor, init }) => {
        return {
          url: `${notificationRoutes.BASE}?cursor=${cursor}&limit=${10}&init=${init}`,
          method: 'GET',
        };
      },
      keepUnusedDataFor: 60 * 5,

      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentCache, newItems) => {
        if (newItems.data.init === Init.TRUE) {
          return newItems;
        }

        if (currentCache.data) {
          return {
            ...currentCache,
            data: {
              ...currentCache.data,
              total: newItems.data.total,
              rest: newItems.data.rest,
              items: [...currentCache.data.items, ...newItems.data.items],
            },
          };
        }

        return newItems;
      },
    }),

    setStatusViewedNotif: builder.mutation<
      ApiResponse<NotificationRes>,
      NotificationReq
    >({
      query: () => ({
        url: `${notificationRoutes.BASE}/`,
        method: 'PATCH',
      }),

      invalidatesTags: ['NotificationStatus'],

      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;
        if (result.data.status === 'success') {
          dispatch(
            notificationsApi.util.updateQueryData(
              'getNotifications',
              arg,
              draft => {
                draft.data.items = draft.data.items.map(item => ({
                  ...item,
                  status: NotificationStatus.VIEWED,
                }));
              }
            )
          );
        }
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetQntNotificationByStatusQuery,
  useSetStatusViewedNotifMutation,
} = notificationsApi;
