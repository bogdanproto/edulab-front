import { usePopover } from '@/hooks/usePopover';
import { authSelectors } from '@/redux/auth/authSelectors';
import { User } from '@/redux/auth/authSlice';
import stringAvatar from '@/utils/stringAvatar';
import MenuIcon from '@mui/icons-material/Menu';
import { Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { NotificationsInterface } from 'components/Notifications';
import * as React from 'react';
import { useSelector } from 'react-redux';

import { MobileNav } from './MobileNav';
import { UserPopover } from './UserPopover';

export function MainNav(): React.JSX.Element {
  const user: User = useSelector(authSelectors.getUser);

  const [openNav, setOpenNav] = React.useState<boolean>(false);

  const userPopover = usePopover<HTMLDivElement>();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid gray',
          backgroundColor: 'common.white',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            minHeight: '64px',
            px: 2,
          }}
        >
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <NotificationsInterface />
            <Tooltip title={user.firstName + ' ' + user.lastName}>
              {user.avatarUrl ? (
                <Avatar
                  sx={{ cursor: 'pointer' }}
                  alt={user.firstName + ' ' + user.lastName}
                  src={user.avatarUrl}
                  onClick={userPopover.handleOpen}
                  ref={userPopover.anchorRef}
                />
              ) : (
                <Avatar
                  {...stringAvatar(user.firstName + ' ' + user.lastName)}
                  style={{ fontSize: 18, cursor: 'pointer' }}
                  onClick={userPopover.handleOpen}
                  ref={userPopover.anchorRef}
                />
              )}
            </Tooltip>
          </Stack>
        </Stack>
      </Box>
      <UserPopover
        anchorEl={userPopover.anchorRef.current}
        onClose={userPopover.handleClose}
        open={userPopover.open}
      />
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
