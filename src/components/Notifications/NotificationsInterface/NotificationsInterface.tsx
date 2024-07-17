import {
  useGetQntNotificationByStatusQuery,
  useSetStatusViewedNotifMutation,
} from '@/redux/notifications/notificationsApi';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { Badge, IconButton, Tooltip } from '@mui/material';
import { useState } from 'react';
import { Init, NotificationStatus } from 'types/notification.d';

import { NotificationsPopover } from '../NotificationsPopover/NotificationsPopover';

export const NotificationsInterface = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [setStatusViewed] = useSetStatusViewedNotifMutation();
  const { data } = useGetQntNotificationByStatusQuery(
    {
      status: NotificationStatus.NOT_VIEWED,
    },
    {
      pollingInterval: !open ? 1000 * 60 * 5 : undefined,
    }
  );

  const handleStatus = (event: React.MouseEvent<HTMLElement>) => {
    if (open && data && data?.data?.total > 0) {
      setStatusViewed({ cursor: 0, init: Init.FALSE });
    }

    setAnchorEl(event.currentTarget);
    setOpen(previousOpen => !previousOpen);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <Badge badgeContent={data?.data?.total} color="primary">
          <IconButton
            type="button"
            onClick={handleStatus}
            sx={{
              padding: 0,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <NotificationsOutlinedIcon />
          </IconButton>
        </Badge>
      </Tooltip>
      {open && (
        <NotificationsPopover
          open={open}
          onClose={handleStatus}
          anchorEl={anchorEl}
          initQuery={data && data?.data?.total > 0 ? Init.TRUE : Init.FALSE}
          initCursor={data && data?.data?.total > 0 ? data?.data?.cursor : null}
        />
      )}
    </>
  );
};
