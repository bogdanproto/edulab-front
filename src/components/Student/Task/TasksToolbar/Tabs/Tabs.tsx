/* eslint-disable no-console */
import { useLocalStorage } from '@/hooks';
import { Task } from 'types/task';

import { TabCaption, TabsHolder, TasksCounter } from './Tabs.styled';

type TabsProps = {
  handleTaskStatusFilter: (value: string) => void;
  isFetching: boolean;
  tasksByStatus: {
    uncompleted: Task[];
    completed: Task[];
    checked: Task[];
  };
};

const Tabs: React.FC<TabsProps> = ({
  isFetching,
  handleTaskStatusFilter,
  tasksByStatus,
}) => {
  const [tabValue, setTabValue] = useLocalStorage('tabValue', 'Uncompleted');

  const handleTabClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget.textContent?.includes('Uncompleted')) {
      setTabValue('Uncompleted');
      handleTaskStatusFilter('Uncompleted');
    }
    if (e.currentTarget.textContent?.includes('Completed')) {
      setTabValue('Completed');
      handleTaskStatusFilter('Completed');
    }
    if (e.currentTarget.textContent?.includes('Checked')) {
      setTabValue('Checked');
      handleTaskStatusFilter('Checked');
    }
  };

  return (
    <TabsHolder>
      <TabCaption active={tabValue === 'Uncompleted'} onClick={handleTabClick}>
        <span>Uncompleted</span>
        {!isFetching && (
          <TasksCounter active={tabValue === 'Uncompleted'}>
            {tasksByStatus.uncompleted.length
              ? tasksByStatus.uncompleted.length
              : 0}
          </TasksCounter>
        )}
      </TabCaption>
      <TabCaption active={tabValue === 'Completed'} onClick={handleTabClick}>
        <span>Completed</span>
        {!isFetching && (
          <TasksCounter active={tabValue === 'Completed'}>
            {tasksByStatus.completed.length
              ? tasksByStatus.completed.length
              : 0}
          </TasksCounter>
        )}
      </TabCaption>
      <TabCaption active={tabValue === 'Checked'} onClick={handleTabClick}>
        <span>Checked</span>{' '}
        {!isFetching && (
          <TasksCounter active={tabValue === 'Checked'}>
            {tasksByStatus.checked.length ? tasksByStatus.checked.length : 0}
          </TasksCounter>
        )}
      </TabCaption>
    </TabsHolder>
  );
};

export default Tabs;
