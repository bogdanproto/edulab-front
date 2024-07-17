import { getDifferenceTime } from '@/utils';
import { Box, Paper, Typography } from '@mui/material';
import { Notification } from 'types/notification';

import { NotificationIconType } from '../NotificationIconType/NotificationIconType';

type ItemNotificationProps = {
  item: Notification;
};

export const ItemNotification: React.FC<ItemNotificationProps> = ({
  item: { status, type, date, message },
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        position: 'relative',
        minHeight: '84px',
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '8px',
      }}
    >
      <NotificationIconType type={type} status={status} />

      <Typography
        variant="caption"
        style={{ lineHeight: '1.2', fontSize: '10px' }}
      >
        {message}
      </Typography>
      <Box sx={{ position: 'absolute', top: '8px', right: '8px' }}>
        <Typography
          variant="caption"
          style={{ lineHeight: '1.2', fontSize: '10px' }}
        >
          {getDifferenceTime(date)}
        </Typography>
      </Box>
    </Paper>
  );
};
