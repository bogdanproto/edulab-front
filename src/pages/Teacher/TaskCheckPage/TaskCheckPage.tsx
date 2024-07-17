import { BreadCrumbsRouter } from 'components/core';
import TaskCheck from 'components/Teacher/tasks/TaskCheck/TaskCheck';
import NotFoundPage from 'pages/NotFoundPage';
import { useParams } from 'react-router-dom';

const TaskCheckPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const taskIdNum = taskId ? parseInt(taskId) : NaN;

  if (isNaN(taskIdNum)) {
    return <NotFoundPage />;
  }

  return (
    <>
      <BreadCrumbsRouter />
      <TaskCheck taskIdNum={taskIdNum} />
    </>
  );
};

export default TaskCheckPage;
