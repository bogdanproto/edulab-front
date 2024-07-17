import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {
  Badge,
  IconButton,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from '@mui/material';
import { Homework, TypeLessonFiles } from 'types/course';
import { Test } from 'types/tests';

import { Popconfirm } from '../Popconfirm/Popconfirm';

type ItemSourceProps = {
  item: Test | Homework;
  typeFiles: TypeLessonFiles;
  handleEvent: () => void;
};

export const ItemSource: React.FC<ItemSourceProps> = ({
  typeFiles,
  item: { title, id },
  handleEvent,
}) => {
  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <Popconfirm
            title={`Delete the ${typeFiles}`}
            description={`Are you sure to delete ${title}`}
            onConfirm={handleEvent}
          >
            <IconButton
              edge="end"
              aria-label="delete"
              sx={{
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Popconfirm>
        </Stack>
      }
      sx={{ borderBottom: '1px solid lightGrey', paddingRight: 'px' }}
    >
      <ListItemAvatar>
        <Badge>
          {typeFiles === 'materials' ? (
            <MenuBookIcon color="primary" />
          ) : (
            <AssignmentIcon color="primary" />
          )}
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link href={`teacher/tests/${id}`} rel="noopener noreferrer">
            {title}
          </Link>
        }
      />
    </ListItem>
  );
};
