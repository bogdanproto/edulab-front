import { RootState } from '@/redux/store';
import { tasksApi } from '@/redux/tasks/tasksApi';
import { createSelector } from '@reduxjs/toolkit';
import { Task, TaskStatus, TaskType } from 'types/task.d';

const selectTasks = (state: RootState) =>
  tasksApi.endpoints.getTasksByUserId.select()(state).data;
const selectFilterGroup = (state: RootState) => state.tasks.filterGroup;
const selectFilterType = (state: RootState) => state.tasks.filterType;
const selectSearchQuery = (state: RootState) => state.tasks.searchQuery;
const selectTabValue = (state: RootState) => state.tasks.tabValue;

const selectPage = (state: RootState) => state.tasks.page;
const selectItemsPerPage = (state: RootState) => state.tasks.itemsPerPage;

export const selectFilteredTasks = createSelector(
  [
    selectTasks,
    selectFilterGroup,
    selectFilterType,
    selectSearchQuery,
    selectTabValue,
  ],
  (tasks, filterGroup, filterType, searchQuery, tabValue) => {
    return (
      tasks?.data?.filter(
        (task: Task) =>
          (filterGroup === '' || task.groupName.includes(filterGroup)) &&
          (filterType === 'all' ||
            (filterType === TaskType.Test && task.taskType === TaskType.Test) ||
            (filterType === TaskType.Homework &&
              task.taskType === TaskType.Homework)) &&
          (searchQuery === '' ||
            task.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.groupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.lessonTitle
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            task.courseTitle
              .toLowerCase()
              .includes(searchQuery.toLowerCase())) &&
          ((tabValue === 0 && task.status === TaskStatus.Done) ||
            (tabValue === 1 && task.status === TaskStatus.Check) ||
            (tabValue === 2 && task.status === TaskStatus.Null) ||
            tabValue === 3)
      ) ?? []
    );
  }
);

export const selectPaginatedTasks = createSelector(
  [selectFilteredTasks, selectPage, selectItemsPerPage],
  (filteredTasks, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return filteredTasks.slice(startIndex, endIndex);
  }
);

export const selectTotalPages = createSelector(
  [selectFilteredTasks, selectItemsPerPage],
  (filteredTasks, itemsPerPage) => {
    const totalTasks = filteredTasks.length;

    return Math.ceil(totalTasks / itemsPerPage);
  }
);
