import { paths } from '@/consts';
import { useNavItems } from '@/hooks/useNavItems';
import { authSelectors } from '@/redux/auth/authSelectors';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import LogoWithRole from 'components/core/Logo/LogoWithRole';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import renderNavItems from './renderNavItems';

export function SideNav(): React.JSX.Element {
  const userRole = useSelector(authSelectors.getUserRole);

  const location = useLocation();
  const pathname = location.pathname;
  const navItems = useNavItems(userRole);

  return (
    <Box
      sx={{
        bgcolor: 'primary.dark',
        color: 'primary.contrastText',
        display: { xs: 'none', lg: 'flex' },
        flexDirection: 'column',
        height: '100%',
        left: 0,
        maxWidth: '100%',
        position: 'fixed',
        scrollbarWidth: 'none',
        top: 0,
        width: '280px',
        zIndex: 1100,
        '&::-webkit-scrollbar': { display: 'none' },
      }}
    >
      <Box
        component={Link}
        to={paths.home}
        sx={{ display: 'inline-flex', p: '24px' }}
      >
        <LogoWithRole />
      </Box>
      {/* menu list */}
      <Box component="nav" sx={{ flex: '1 1 auto', p: '12px' }}>
        {renderNavItems({ pathname, items: navItems })}
      </Box>
      <Divider sx={{ borderColor: 'primary.contrastText' }} />
    </Box>
  );
}
