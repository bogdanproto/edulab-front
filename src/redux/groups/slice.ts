import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState: initialState,
  reducers: {
    setFilterGroups: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setFilterGroups } = groupsSlice.actions;
export const groupsReducer = groupsSlice.reducer;
