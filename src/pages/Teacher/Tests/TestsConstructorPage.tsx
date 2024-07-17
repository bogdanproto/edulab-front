import { Breadcrumbs, Link, Typography } from '@mui/material';
import { TestList } from 'components/Tests';
import { Link as RouterLink } from 'react-router-dom';

const TestsConstructorPage = () => {
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
        <Typography color="text.primary">Tests</Typography>
      </Breadcrumbs>

      <TestList />
    </>
  );
};

export default TestsConstructorPage;
