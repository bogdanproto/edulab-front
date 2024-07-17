import { BreadCrumbsRouter } from 'components/core';
import TestPlayer from 'components/Tests/TestPlayer';
import { useParams } from 'react-router-dom';

const TestPlayerPage = () => {
  const { taskId } = useParams();

  return (
    <div>
      <BreadCrumbsRouter />
      <TestPlayer
        taskId={Number(taskId)}
        cancelRedirectTo={`/student/tasks/${taskId}`}
      />
    </div>
  );
};

export default TestPlayerPage;
