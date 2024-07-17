import { useLocalStorage } from '@/hooks';
import { Radio } from '@mui/material';
import { Task } from 'types/task';

import Tabs from './Tabs';
import TasksFilter from './TasksFilter';
import {
  ToolBarWrapper,
  RadioGroup,
  AuxiliaryWrapper,
  Label,
} from './TasksToolbar.styled';

type TasksToolbarProps = {
  isFetching: boolean;
  handleCorseTitleFilter: (value: string | null) => void;
  handleTaskTypeFilter: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskStatusFilter: (value: string) => void;
  options: string[];
  tasks: Task[];
  filtersData: {
    filterByType: string;
    filter: string;
  };
};

const TasksToolbar: React.FC<TasksToolbarProps> = ({
  isFetching,
  handleCorseTitleFilter,
  handleTaskTypeFilter,
  handleTaskStatusFilter,
  options,
  tasks,
  filtersData,
}) => {
  const [selectedValue, setSelectedValue] = useLocalStorage(
    'selectedValue',
    ''
  );

  const filteredTasks = tasks
    .filter(task => task.taskType.includes(filtersData.filterByType))
    .filter(task => task.courseTitle.includes(filtersData.filter));

  const uncompletedTasks = filteredTasks.filter(task => task.status === 'null');
  const completedTasks = filteredTasks.filter(task => task.status === 'done');
  const checkedTasks = filteredTasks.filter(task => task.status === 'check');

  const tasksByStatus = {
    uncompleted: uncompletedTasks,
    completed: completedTasks,
    checked: checkedTasks,
  };

  return (
    <ToolBarWrapper>
      <Tabs
        isFetching={isFetching}
        handleTaskStatusFilter={handleTaskStatusFilter}
        tasksByStatus={tasksByStatus}
      />
      <AuxiliaryWrapper>
        <TasksFilter handleSearch={handleCorseTitleFilter} options={options} />
        <RadioGroup defaultValue="" name="radio-buttons-group">
          <Label
            value=""
            control={
              <Radio
                size="small"
                checked={selectedValue === ''}
                onChange={e => {
                  setSelectedValue(e.target.value);
                  handleTaskTypeFilter(e);
                }}
              />
            }
            label="All Types"
          />
          <Label
            value="test"
            control={
              <Radio
                size="small"
                checked={selectedValue === 'test'}
                onChange={e => {
                  setSelectedValue(e.target.value);
                  handleTaskTypeFilter(e);
                }}
              />
            }
            label="Tests"
          />
          <Label
            value="homework"
            control={
              <Radio
                size="small"
                checked={selectedValue === 'homework'}
                onChange={e => {
                  setSelectedValue(e.target.value);
                  handleTaskTypeFilter(e);
                }}
              />
            }
            label="Homeworks"
          />
        </RadioGroup>
      </AuxiliaryWrapper>
    </ToolBarWrapper>
  );
};

export default TasksToolbar;
