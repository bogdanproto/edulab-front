import { useGetNotificationsQuery } from '@/redux/notifications/notificationsApi';
import { Button, List, Popover, Skeleton, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Init } from 'types/notification.d';

import { ItemNotification } from '../ItemNotification/ItemNotification';

type NotificationsPopoverProps = {
  onClose: (event: React.MouseEvent<HTMLElement>) => void;
  open: boolean;
  anchorEl: null | HTMLElement;
  initQuery: Init;
  initCursor: number | null;
};

export const NotificationsPopover: React.FC<NotificationsPopoverProps> = ({
  open,
  onClose,
  anchorEl,
  initQuery,
  initCursor,
}) => {
  const [cursor, setCursor] = useState<number | null>(initCursor);
  const [init, setInit] = useState<Init>(initQuery || Init.FALSE);

  const { data, isFetching, refetch } = useGetNotificationsQuery({
    cursor,
    init,
  });

  const response = data && data?.data;

  const handleGetMoreData = () => {
    if (!data?.data.rest) {
      return;
    }

    const lastItem = response && response.items[response.items.length - 1];
    const nextCursor = lastItem && lastItem.id - 1;

    setInit(Init.FALSE);
    setCursor(nextCursor || null);
  };

  useEffect(() => {
    if (!cursor) {
      return;
    }

    refetch();
  }, [refetch, cursor]);

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      slotProps={{
        paper: {
          sx: {
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            marginRight: '8px',
            width: '340px',
            maxHeight: '90vh',
            overflowY: 'auto',
            bgcolor: 'rgba(250, 250, 250, 1)',
          },
        },
      }}
    >
      <>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ borderBottom: '1px solid lightGrey' }}
        >
          Notifications
        </Typography>
        <List sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {response && response?.items.length > 0 ? (
            response?.items.map(item => (
              <ItemNotification key={item.id} item={item} />
            ))
          ) : (
            <>
              {!isFetching && (
                <Typography variant="subtitle1">
                  You have no notifications
                </Typography>
              )}
            </>
          )}
          {isFetching && !response && (
            <Skeleton variant="rounded" height={84} />
          )}
        </List>

        {response && response?.rest > 0 && (
          <Button onClick={handleGetMoreData}>
            View previous notifications
          </Button>
        )}
      </>
    </Popover>
  );
};
