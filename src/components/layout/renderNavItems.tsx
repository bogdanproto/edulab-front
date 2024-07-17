import Stack from '@mui/material/Stack';
import * as React from 'react';

import type { NavItemConfig } from '@/types/nav';

import NavItem from './NavItem';

interface RenderNavItemsProps {
  items?: NavItemConfig[];
  pathname: string;
  onClose?: () => void;
}

function renderNavItems({
  items = [],
  pathname,
  onClose,
}: RenderNavItemsProps): React.JSX.Element {
  const children = items.reduce(
    (acc: React.ReactNode[], curr: NavItemConfig): React.ReactNode[] => {
      const { key, ...item } = curr;

      acc.push(
        <NavItem key={key} pathname={pathname} onClose={onClose} {...item} />
      );

      return acc;
    },
    []
  );

  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {children}
    </Stack>
  );
}

export default renderNavItems;
