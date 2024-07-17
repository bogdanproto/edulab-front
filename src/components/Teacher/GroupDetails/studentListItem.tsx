import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Student } from 'types/student';

export function StudentListItem({ firstName, lastName }: Student) {
  return (
    <ListItem sx={{ borderBottom: '1px solid lightGrey' }}>
      <ListItemAvatar>
        <Avatar>
          <DensitySmallIcon color="primary" />
        </Avatar>
      </ListItemAvatar>
      <ListItemText primary={`${firstName} ${lastName}`} />
    </ListItem>
  );
}
