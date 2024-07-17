import { Breadcrumbs, Link, Typography } from '@mui/material';
import { TestEdit } from 'components/Tests';
import { useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';

const TestEditPage = () => {
  const { testId } = useParams();

  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/teacher"
        >
          Teacher
        </Link>
        <Link
          underline="hover"
          color="inherit"
          component={RouterLink}
          to="/teacher/tests"
        >
          Tests
        </Link>
        <Typography color="text.primary">Edit test</Typography>
      </Breadcrumbs>

      <TestEdit testId={Number(testId)} />
    </>
  );
};

export default TestEditPage;
