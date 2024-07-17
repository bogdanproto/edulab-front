import { useDebouncedSearch } from '@/hooks/useDebouncedSearch';
import { RootState } from '@/redux/store';
import {
  setFilterGroup,
  setFilterType,
  setSearchQuery,
  tasksApi,
} from '@/redux/tasks';
import {
  Box,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiResponse } from 'types/apiResponse';
import { TaskType, Task } from 'types/task.d';

export const TasksListFilters: React.FC = () => {
  const selectTasks = (state: RootState): ApiResponse<Task[]> | undefined =>
    tasksApi.endpoints.getTasksByUserId.select()(state).data;
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const { filterGroup, filterType } = useSelector(
    (state: RootState) => state.tasks
  );
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useDebouncedSearch(
    '',
    300
  );

  const handleFilterGroupChange = (e: SelectChangeEvent<string>) => {
    dispatch(setFilterGroup(e.target.value));
  };

  const handleFilterTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterType(e.target.value as TaskType));
  };

  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchInput(newValue);
    setDebouncedSearchQuery(newValue);
  };

  useEffect(() => {
    dispatch(setSearchQuery(debouncedSearchQuery));
  }, [debouncedSearchQuery, dispatch]);

  const tasks = useSelector(selectTasks);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      mb={2}
      gap={2}
      sx={{ flexWrap: 'wrap' }}
    >
      <Select
        value={filterGroup}
        size="small"
        onChange={handleFilterGroupChange}
        displayEmpty
        sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All groups</MenuItem>
        {Array.isArray(tasks?.data) &&
          Array.from(
            new Set(tasks.data.map((task: Task) => task.groupName))
          ).map(group => (
            <MenuItem key={group} value={group}>
              {group}
            </MenuItem>
          ))}
      </Select>
      <RadioGroup
        row
        aria-labelledby="task-type-filter"
        name="task-type-filter"
        value={filterType}
        onChange={handleFilterTypeChange}
      >
        <FormControlLabel value="all" control={<Radio />} label="All" />
        <FormControlLabel
          value={TaskType.Test}
          control={<Radio />}
          label="Test"
        />
        <FormControlLabel
          value={TaskType.Homework}
          control={<Radio />}
          label="Homework"
        />
      </RadioGroup>

      <TextField
        placeholder="Search"
        variant="outlined"
        size="small"
        value={searchInput}
        onChange={handleSearchQueryChange}
      />
    </Box>
  );
};
