import { paths } from '@/consts';
import { authApi } from '@/redux/auth/authApi';
import { authSelectors } from '@/redux/auth/authSelectors';
import { User } from '@/redux/auth/authSlice';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { UserPathRole } from 'types/paths';

export interface UserPopoverProps {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
}

export function UserPopover({
  anchorEl,
  onClose,
  open,
}: UserPopoverProps): React.JSX.Element {
  const user: User = useSelector(authSelectors.getUser);
  const [logout] = authApi.useLazyLogoutQuery();
  const userPaths = paths[user.role.toLowerCase() as UserPathRole];

  const handleSignOut = React.useCallback(async (): Promise<void> => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }
  }, [logout]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
      onClose={onClose}
      open={open}
      slotProps={{ paper: { sx: { width: '240px' } } }}
    >
      <Box sx={{ p: '16px 20px ' }}>
        <Typography variant="subtitle1">
          {user.firstName + ' ' + user.lastName}{' '}
        </Typography>
        <Typography color="text.secondary" variant="body2">
          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        sx={{ p: '8px', '& .MuiMenuItem-root': { borderRadius: 1 } }}
      >
        {/* <MenuItem component={Link} to={userPaths.settings} onClick={onClose}>
          <ListItemIcon>
            <SettingsOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          Settings
        </MenuItem> */}
        <MenuItem component={Link} to={userPaths.account} onClick={onClose}>
          <ListItemIcon>
            <PersonOutlineOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <ExitToAppOutlinedIcon fontSize="medium" />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </MenuList>
    </Popover>
  );
}
