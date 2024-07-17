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
import { Homework, Material, TypeLessonFiles } from 'types/course';

import { Popconfirm } from '../Popconfirm/Popconfirm';

type ItemFileSourceProps = {
  itemSource: Material | Homework;
  typeFiles: TypeLessonFiles;
  handleEvent: () => void;
};

export const ItemFileSource: React.FC<ItemFileSourceProps> = ({
  typeFiles,
  itemSource: { title, sourceUrl },
  handleEvent,
}) => {
  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <Popconfirm
            title={`Delete the file`}
            description={`Are you sure to delete file ${title}`}
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
          <Link href={sourceUrl} rel="noopener noreferrer">
            {title}
          </Link>
        }
      />
    </ListItem>
  );
};
