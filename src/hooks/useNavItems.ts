import {
  adminNavItems,
  studentNavItems,
  teacherNavItems,
} from '@/consts/navItems';
import { useEffect, useState } from 'react';
import { Role } from 'types/role.d';

import { NavItemConfig } from '@/types/nav';

export function useNavItems(role: Role | ''): NavItemConfig[] {
  const [navItems, setNavItems] = useState<NavItemConfig[]>([]);

  useEffect(() => {
    switch (role) {
      case Role.ADMIN:
        setNavItems(adminNavItems);
        break;
      case Role.TEACHER:
        setNavItems(teacherNavItems);
        break;
      case Role.STUDENT:
        setNavItems(studentNavItems);
        break;
      default:
        setNavItems([]);
        break;
    }
  }, [role]);

  return navItems;
}
