import { useLocalStorage } from '@/hooks';
import { tasksApi } from '@/redux/tasks/tasksApi';
import { Pagination } from '@mui/material';
import { useMediaQuery, useTheme } from '@mui/material';
import { BreadCrumbsRouter } from 'components/core';
import PaginationSelector from 'components/Student/Task/PaginationSelector';
import TaskList from 'components/Student/Task/TaskList';
import TasksToolbar from 'components/Student/Task/TasksToolbar';
import { Task } from 'types/task';

import {
  PageContentWrapper,
  PageSelectionWrapper,
  PaginationSection,
  NoTasksFoundText,
} from './StudentTasksPage.styled';

function StudentTasksPage() {
  const { data = { data: [] }, isFetching } =
    tasksApi.useGetTasksByUserIdQuery();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const siblingCount = isSmallScreen ? 0 : 1;
  const boundaryCount = isSmallScreen ? 0 : 1;

  const [filter, setFilter] = useLocalStorage(
    'filter',
    localStorage.getItem('filter') || ''
  );
  const [filterByStatus, setFilterByStatus] = useLocalStorage(
    'filterByStatus',
    'null'
  );
  const [filterByType, setFilterByType] = useLocalStorage(
    'filterByType',
    localStorage.getItem('filterByType') || ''
  );
  const [currentPage, setCurrentPage] = useLocalStorage('currentPage', 1);
  const [tasksPerPage, setTasksPerPage] = useLocalStorage('tasksPerPage', 5);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const handleTaskStatusFilter = (value: string) => {
    if (value === 'Uncompleted') setFilterByStatus('null');
    if (value === 'Completed') setFilterByStatus('done');
    if (value === 'Checked') setFilterByStatus('check');
  };

  const handleCorseTitleFilter = (value: string | null) => {
    const newValue = value || '';
    setFilter(newValue);
  };
  const handleTaskTypeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterByType(e.target.value);
  };

  const calculateTasksToDisplay = (tasks: Task[]) => {
    if (currentPage > 1 && Math.ceil(totalTasks / tasksPerPage) <= 1) {
      setCurrentPage(1);
    }
    const indexOfLastTask = currentPage * tasksPerPage - 1;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage + 1;

    return tasks.slice(indexOfFirstTask, indexOfLastTask + 1);
  };

  const filteredTasksByStatus = data.data.filter(
    task => task.status !== null && task.status.includes(filterByStatus)
  );

  const filteredTasksByType = filteredTasksByStatus.filter(task =>
    task.taskType.includes(filterByType)
  );

  const filteredTasksByCorseTitle = filteredTasksByType.filter(task =>
    task.courseTitle.includes(filter)
  );

  const totalTasks = filteredTasksByCorseTitle.length;
  const tasksToDisplay = calculateTasksToDisplay(filteredTasksByCorseTitle);

  return (
    <PageContentWrapper>
      <BreadCrumbsRouter />
      <TasksToolbar
        options={data.data.map(task => task.courseTitle)}
        handleTaskStatusFilter={handleTaskStatusFilter}
        handleCorseTitleFilter={handleCorseTitleFilter}
        handleTaskTypeFilter={handleTaskTypeFilter}
        tasks={data.data}
        filtersData={{ filterByType, filter }}
        isFetching={isFetching}
      />
      {isFetching ? null : tasksToDisplay.length ? (
        <>
          <TaskList tasks={tasksToDisplay} />
          <PaginationSection
            style={{
              justifyContent:
                Math.ceil(totalTasks / tasksPerPage) > 1
                  ? 'space-between'
                  : 'flex-end',
            }}
          >
            {Math.ceil(totalTasks / tasksPerPage) > 1 && (
              <PageSelectionWrapper>
                <Pagination
                  size={isSmallScreen ? 'small' : 'medium'}
                  count={Math.ceil(totalTasks / tasksPerPage)}
                  variant="outlined"
                  color="secondary"
                  page={Number(currentPage)}
                  onChange={handlePageChange}
                  siblingCount={siblingCount}
                  boundaryCount={boundaryCount}
                  showLastButton={isSmallScreen}
                  showFirstButton={isSmallScreen}
                />
              </PageSelectionWrapper>
            )}
            <PaginationSelector
              tasksPerPage={tasksPerPage}
              setTasksPerPage={setTasksPerPage}
              isSmallScreen={isSmallScreen}
            />
          </PaginationSection>
        </>
      ) : (
        <NoTasksFoundText>No tasks found.</NoTasksFoundText>
      )}
    </PageContentWrapper>
  );
}

export default StudentTasksPage;
