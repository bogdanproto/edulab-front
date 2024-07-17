import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import GroupIcon from '@mui/icons-material/Group';
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Group } from 'types/group';

export function GroupListItem({ id, name }: Group & { key: number }) {
  return (
    <Link to={`${id}`} style={{ color: 'black', textDecoration: 'none' }}>
      <ListItem
        sx={{
          '&:hover': { borderBottom: '3px solid lightGrey' },
          borderBottom: '1px solid lightGrey',
        }}
        secondaryAction={
          <>
            <Stack direction="row" spacing={1}>
              <GroupIcon />
            </Stack>
          </>
        }
      >
        <ListItemAvatar>
          <Avatar>
            <DensitySmallIcon color="primary" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  );
}
