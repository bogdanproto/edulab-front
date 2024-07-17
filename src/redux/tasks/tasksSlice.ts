import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskType } from 'types/task.d';

interface TasksState {
  filterGroup: string;
  filterType: TaskType | 'all';
  searchQuery: string;
  tabValue: number;
  page: number;
  itemsPerPage: number;
}

const initialState: TasksState = {
  filterGroup: '',
  filterType: 'all',
  searchQuery: '',
  tabValue: 0,
  page: 1,
  itemsPerPage: 10,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setFilterGroup: (state, action: PayloadAction<string>) => {
      state.filterGroup = action.payload;
      state.page = 1;
    },
    setFilterType: (state, action: PayloadAction<TaskType | 'all'>) => {
      state.filterType = action.payload;
      state.page = 1;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1;
    },
    setTabValue: (state, action: PayloadAction<number>) => {
      state.tabValue = action.payload;
      state.page = 1;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload;
      state.page = 1;
    },
  },
});

export const {
  setPage,
  setFilterGroup,
  setFilterType,
  setSearchQuery,
  setTabValue,
  setItemsPerPage,
} = tasksSlice.actions;
export const tasksReducer = tasksSlice.reducer;
