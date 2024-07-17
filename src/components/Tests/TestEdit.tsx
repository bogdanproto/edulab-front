import { useGetTestByIdQuery } from '@/redux/tests/testsApi';
import { Button, Stack, Typography } from '@mui/material';
import { NotFoundPage } from 'pages/index';
import { FC, useState } from 'react';

import { AccordionNewQuestion } from './AccordionNewQuestion';
import QuestionsList from './QuestionsList';
import TestEditForm from './TestEditForm';

type Props = {
  testId: number;
};

const TestEdit: FC<Props> = ({ testId }) => {
  const [expanded, setExpanded] = useState(false);
  const { data, error, isLoading } = useGetTestByIdQuery(testId.toString(), {
    skip: !testId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error && 'status' in error && error.status === 404) {
    return <NotFoundPage />;
  }

  return (
    <>
      <Typography variant="h5" component="h2" mt={2}>
        Test edit
      </Typography>
      <TestEditForm btnCaption="Save test" testId={testId} data={data?.data} />
      <Stack
        justifyContent="space-between"
        alignItems="center"
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        pb={1}
        mt={3}
      >
        <Typography variant="h5" component="h2" mt={2}>
          Questions edit
        </Typography>
        <Button
          variant="contained"
          onClick={() => setExpanded(true)}
          sx={{ width: { xs: '100%', sm: 'initial' } }}
        >
          Add question
        </Button>
      </Stack>

      {testId && <QuestionsList testId={testId} />}
      {testId && (
        <AccordionNewQuestion
          expanded={expanded}
          testId={testId}
          onChangeExpanded={() => {
            setExpanded(!expanded);
          }}
        />
      )}
    </>
  );
};

export default TestEdit;
