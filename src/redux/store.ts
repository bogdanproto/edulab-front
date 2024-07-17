import { tasksApi } from '@/redux/tasks/tasksApi.ts';
import { tasksReducer } from '@/redux/tasks/tasksSlice.ts';
import { usersApi } from '@/redux/users/usersApi.ts';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { authApi } from './auth/authApi.ts';
import { authReducer } from './auth/authSlice.ts';
import { rtkNotifyMiddleWare } from './common/rtkNotifyMiddleWare.ts';
import { coursesApi } from './courses/coursesApi.ts';
import { homeworksApi } from './courses/homeworksApi.ts';
import { lessonsApi } from './courses/lessonsApi.ts';
import { materialsApi } from './courses/materialsApi.ts';
import { dashboardStudentApi } from './dashboard/dashboardStudentApi.ts';
import { dashboardTeacherApi } from './dashboard/dashboardTeacherApi.ts';
import { groupsApi, groupsReducer } from './groups';
import { notificationsApi } from './notifications/notificationsApi.ts';
import { notifySliceReducer } from './notifySlice';
import { testsApi } from './tests/testsApi';
import { testsReducer } from './tests/testsSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
  reducer: {
    notify: notifySliceReducer,
    tests: testsReducer,
    groups: groupsReducer,
    tasks: tasksReducer,
    [groupsApi.reducerPath]: groupsApi.reducer,
    [testsApi.reducerPath]: testsApi.reducer,
    [coursesApi.reducerPath]: coursesApi.reducer,
    [lessonsApi.reducerPath]: lessonsApi.reducer,
    [materialsApi.reducerPath]: materialsApi.reducer,
    [homeworksApi.reducerPath]: homeworksApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [dashboardTeacherApi.reducerPath]: dashboardTeacherApi.reducer,
    [dashboardStudentApi.reducerPath]: dashboardStudentApi.reducer,
    auth: persistedAuthReducer,
  },
  middleware: gDM =>
    gDM({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      groupsApi.middleware,
      testsApi.middleware,
      coursesApi.middleware,
      lessonsApi.middleware,
      materialsApi.middleware,
      homeworksApi.middleware,
      usersApi.middleware,
      authApi.middleware,
      tasksApi.middleware,
      notificationsApi.middleware,
      dashboardTeacherApi.middleware,
      dashboardStudentApi.middleware,
      rtkNotifyMiddleWare
    ),
});

export type TypeDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);
