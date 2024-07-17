import { BreadCrumbsRouter } from 'components/core';
import TasksList from 'components/Teacher/tasks/TasksList/TasksList';

const TasksPage = () => {
  return (
    <>
      <BreadCrumbsRouter />
      <TasksList />
    </>
  );
};

export default TasksPage;
