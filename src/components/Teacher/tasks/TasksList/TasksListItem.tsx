import { paths } from '@/consts/paths';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import QuizIcon from '@mui/icons-material/Quiz';
import { Grid, IconButton, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { TaskType, Task } from 'types/task.d';

interface TasksListItemProps {
  task: Task;
}

export const TasksListItem: React.FC<TasksListItemProps> = ({ task }) => {
  return (
    <Grid
      item
      xs={12}
      container
      component={Link}
      to={`${paths.teacher.tasks}/${task.id}`}
      alignItems="center"
      sx={{
        textDecoration: 'none',
        color: 'inherit',
        borderBottom: '1px solid lightGrey',
        ...(task.status === 'null' && {
          backgroundColor: 'rgba(244, 67, 54, 0.04)',
        }),
        '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.02)' },
      }}
    >
      <Grid
        item
        xs={1}
        sx={{ textAlign: 'center', display: { xs: 'none', sm: 'block' } }}
        color="primary.main"
      >
        {task.taskType === TaskType.Homework ? (
          <HistoryEduIcon />
        ) : (
          <QuizIcon />
        )}
      </Grid>
      <Grid item xs={9} md={4}>
        <ListItemText
          primary={`${task.firstName} ${task.lastName}`}
          secondary={task.groupName}
        />
      </Grid>
      <Grid item xs={5} sx={{ display: { xs: 'none', md: 'block' } }}>
        <ListItemText primary={task.lessonTitle} secondary={task.courseTitle} />
      </Grid>
      <Grid item xs={1}>
        <Typography>{task.grade ?? '-'}</Typography>
      </Grid>
      <Grid item xs={1} sx={{ textAlign: 'center' }}>
        <IconButton
          edge="end"
          aria-label="check"
          sx={{
            '&:hover': {
              color: 'primary.main',
            },
          }}
        >
          <ArrowCircleRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
