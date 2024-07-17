import { tasksItemsPerPageOptions } from '@/consts/tasks/tasksItemsPerPageOptions';
import { RootState } from '@/redux/store';
import {
  selectPaginatedTasks,
  selectTotalPages,
  setItemsPerPage,
} from '@/redux/tasks';
import { useGetTasksByUserIdQuery } from '@/redux/tasks/tasksApi';
import { setPage } from '@/redux/tasks/tasksSlice';
import { SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import ItemsPerPageSelect from 'components/core/ItemsPerPageSelect/ItemsPerPageSelect';
import TaskTabs from 'components/Teacher/tasks/TasksList/TaskTabs';
import { useDispatch, useSelector } from 'react-redux';

import { TasksListFilters } from './TasksListFilters';
import { TasksListItem } from './TasksListItem';

const TasksList: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useGetTasksByUserIdQuery();
  const itemsPerPage = useSelector(
    (state: RootState) => state.tasks.itemsPerPage
  );
  const page = useSelector((state: RootState) => state.tasks.page);
  const totalPages = useSelector(selectTotalPages);
  const paginatedTasks = useSelector(selectPaginatedTasks);
  const tabValue = useSelector((state: RootState) => state.tasks.tabValue);

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const value = event.target.value;
    dispatch(setItemsPerPage(Number(value)));
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(setPage(value));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <TasksListFilters />
      <TaskTabs tabValue={tabValue} />
      {paginatedTasks.length > 0 ? (
        paginatedTasks.map(task => <TasksListItem key={task.id} task={task} />)
      ) : (
        <Box minHeight={'57px'} display={'flex'} alignItems={'center'}>
          <Typography>No tasks found.</Typography>
        </Box>
      )}
      <Box
        display="flex"
        marginTop={2}
        alignItems="center"
        justifyContent="flex-end"
      >
        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            style={{ flexGrow: 1 }}
          />
        )}
        <ItemsPerPageSelect
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          itemsPerPageOptions={tasksItemsPerPageOptions}
        />
      </Box>
    </Box>
  );
};

export default TasksList;
