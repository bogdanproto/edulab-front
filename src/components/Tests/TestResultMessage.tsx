import { Box, Button, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  totalQuestons: number;
  correctAnswers: number;
  scores: number;
  cancelRedirectTo?: string;
  onClose?: () => void;
  isTask?: boolean;
};

const TestResultMessage: FC<Props> = ({
  totalQuestons,
  correctAnswers,
  scores,
  cancelRedirectTo,
  onClose,
  isTask,
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ minWidth: '240px' }}>
      <Typography variant="h5" component="h2" mt={2}>
        Result
      </Typography>
      <Typography variant="h6" component="p" mt={2}>
        Total questons: {totalQuestons}
      </Typography>
      <Typography variant="h6" component="p" mt={2}>
        Correct answers: {correctAnswers}
      </Typography>
      <Typography variant="h6" component="p" mt={2}>
        Scores: {scores.toFixed(2)}
      </Typography>
      <Stack justifyContent="end" mt={2}>
        <Button
          variant="contained"
          type="button"
          onClick={() => {
            cancelRedirectTo && navigate(cancelRedirectTo);
            onClose && onClose();
          }}
        >
          {isTask ? 'Return to task' : 'Ok'}
        </Button>
      </Stack>
    </Box>
  );
};

export default TestResultMessage;
