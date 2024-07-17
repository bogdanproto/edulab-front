import {
  useGetTaskByIdQuery,
  useAddTaskGradeMutation,
  useDeleteTaskGradeMutation,
} from '@/redux/tasks/tasksApi';
import VerifiedIcon from '@mui/icons-material/Verified';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import TaskLinkPreview from 'components/Teacher/tasks/TaskCheck/TaskLinkPreview';
import TestPlayer from 'components/Tests/TestPlayer';
import NotFoundPage from 'pages/NotFoundPage';
import React, { useState } from 'react';
import { TaskCheckData } from 'types/task.d';

const TaskCheck: React.FC<{ taskIdNum: number }> = ({ taskIdNum }) => {
  const { data, isLoading, error } = useGetTaskByIdQuery(taskIdNum);

  const [addTaskGrade, { isLoading: isAddingGrade }] =
    useAddTaskGradeMutation();
  const [deleteTaskGrade, { isLoading: isDeletingGrade }] =
    useDeleteTaskGradeMutation();

  const taskData = data?.data ?? ({} as TaskCheckData);
  const {
    grade: currentGrade,
    firstName,
    lastName,
    groupName,
    courseTitle,
    lessonTitle,
    homework,
    test,
    taskType,
    status,
  } = taskData;

  const { correctAnswers, totalQuestions, scores, maxScores } = test ?? {};
  const [grade, setGrade] = useState<number | null>(currentGrade ?? null);

  const handleGradeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseInt(event.target.value) : null;
    setGrade(value !== null && value >= 1 && value <= 100 ? value : null);
  };

  const handleAddGrade = async () => {
    if (grade !== null && !isNaN(taskIdNum)) {
      await addTaskGrade({ taskId: taskIdNum, grade });
    }
  };

  const handleDeleteGrade = async () => {
    if (!isNaN(taskIdNum)) {
      await deleteTaskGrade(taskIdNum);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isGradeValid = grade !== null && grade >= 1 && grade <= 100;

  if (error && 'status' in error && error.status === 404 && isNaN(taskIdNum)) {
    return <NotFoundPage />;
  }
  if (Object.keys(taskData).length === 0) {
    return <NotFoundPage />;
  }

  return (
    <Box>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: currentGrade !== null ? 'primary.main' : 'initial' }}
      >
        {firstName} {lastName} / {taskType}{' '}
        {currentGrade !== null && <VerifiedIcon />}{' '}
        {currentGrade !== null && currentGrade}
      </Typography>
      <Typography variant="h6" gutterBottom>
        {groupName} | {courseTitle} | {lessonTitle}
      </Typography>

      {status !== 'null' && homework && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {homework.title}
          </Typography>
          {homework.homeworkUrl ? (
            <TaskLinkPreview url={homework.homeworkUrl} maxLength={40} />
          ) : (
            <Typography color="textSecondary" variant="body2">
              No files submitted
            </Typography>
          )}
        </Paper>
      )}

      {status !== 'null' && test && (
        <Paper elevation={2} sx={{ p: 2 }}>
          <TestPlayer
            testId={taskData.testId}
            taskId={taskIdNum}
            disabledSendBtn
          />
          <hr color="grey" />

          <Typography color="textSecondary" variant="body2">
            {`Questions: ${correctAnswers} / ${totalQuestions}. `}
            {`Score: ${scores} / ${maxScores}.`}
          </Typography>
        </Paper>
      )}

      {status !== 'null' && (
        <Grid container spacing={2} alignItems="center" mt={2}>
          <Grid item>
            <TextField
              label="Grade"
              type="number"
              size="small"
              value={grade ?? currentGrade ?? ''}
              onChange={handleGradeChange}
              disabled={currentGrade !== null}
              sx={{ maxWidth: '100px' }}
            />
          </Grid>
          <Grid item>
            {currentGrade === null ? (
              <Button
                variant="contained"
                onClick={handleAddGrade}
                disabled={isAddingGrade || !isGradeValid || isNaN(taskIdNum)}
              >
                Add Grade
              </Button>
            ) : (
              <Button
                variant="contained"
                color="error"
                onClick={handleDeleteGrade}
                disabled={isDeletingGrade || isNaN(taskIdNum)}
              >
                Delete Grade
              </Button>
            )}
          </Grid>
        </Grid>
      )}

      {status === 'null' && (
        <Paper
          elevation={2}
          sx={{ p: 2, backgroundColor: 'rgba(244, 67, 54, 0.04)' }}
        >
          <Typography color="textSecondary" variant="body2">
            {taskType} not submitted yet
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default TaskCheck;
