import { paths } from '@/consts';
import { useNavItems } from '@/hooks/useNavItems';
import { authSelectors } from '@/redux/auth/authSelectors';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Logo from 'components/core/Logo/Logo';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import type { NavItemConfig } from '@/types/nav';

import renderNavItems from './renderNavItems';

export interface MobileNavProps {
  onClose?: () => void;
  open?: boolean;
  items?: NavItemConfig[];
}

export function MobileNav({
  open,
  onClose,
}: MobileNavProps): React.JSX.Element {
  const userRole = useSelector(authSelectors.getUserRole);
  const location = useLocation();
  const pathname = location.pathname;
  const navItems = useNavItems(userRole);

  return (
    <Drawer
      PaperProps={{
        sx: {
          bgcolor: 'primary.dark',
          color: 'primary.contrastText',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          scrollbarWidth: 'none',
          width: '320px',
          zIndex: 1100,
          '&::-webkit-scrollbar': { display: 'none' },
        },
      }}
      onClose={onClose}
      open={open}
    >
      <Box
        component={Link}
        to={paths.home}
        sx={{ display: 'inline-flex', p: '24px' }}
      >
        <Logo />
      </Box>
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {renderNavItems({ pathname, items: navItems, onClose })}
      </Box>
      <Divider sx={{ borderColor: 'primary.contrastText' }} />
    </Drawer>
  );
}
