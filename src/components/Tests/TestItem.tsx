import { useDeleteTestMutation } from '@/redux/tests/testsApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  ListItem,
  IconButton,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Stack,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Popconfirm } from 'components/core';
import { FC } from 'react';
import { Link } from 'react-router-dom';

import { TestDesc } from '@/types/tests.d';

import TestItemMenu from './TestItemMenu';

type Props = {
  test: TestDesc;
};

const TestItem: FC<Props> = ({ test }) => {
  const { id, title, questionCount } = test;
  const [deleteTest] = useDeleteTestMutation();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <>
      <ListItem
        secondaryAction={
          <Stack direction="row" spacing={1}>
            {matches && (
              <>
                <IconButton
                  edge="end"
                  aria-label="view"
                  sx={{
                    '&:hover': {
                      // eslint-disable-next-line sonarjs/no-duplicate-string
                      color: 'primary.main',
                    },
                  }}
                  component={Link}
                  to={`/teacher/tests/${id}`}
                >
                  <VisibilityIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  title="Edit test"
                  sx={{
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                  component={Link}
                  to={`/teacher/tests/${id}/edit`}
                >
                  <EditIcon />
                </IconButton>

                <Popconfirm
                  title="Delete the test"
                  description={`Are you sure to delete test ${title}?`}
                  onConfirm={() => deleteTest(id)}
                >
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    title="Delete test"
                    sx={{
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Popconfirm>
              </>
            )}
            {!matches && (
              <TestItemMenu testId={id} deleteTest={deleteTest} title={title} />
            )}
          </Stack>
        }
        sx={{ borderBottom: '1px solid lightGrey', paddingRight: '120px' }}
      >
        <ListItemAvatar>
          <Avatar>
            <QuestionMarkIcon color="primary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={`Queston count: ${questionCount}`}
        />
      </ListItem>
    </>
  );
};

export default TestItem;
