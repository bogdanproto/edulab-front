import { BreadCrumbsRouter } from 'components/core';
import TestPlayer from 'components/Tests/TestPlayer';
import { useParams } from 'react-router-dom';

const TestPlayerPage = () => {
  const { testId } = useParams();

  return (
    <div>
      <BreadCrumbsRouter />
      <TestPlayer testId={Number(testId)} cancelRedirectTo="/teacher/tests" />
    </div>
  );
};

export default TestPlayerPage;
