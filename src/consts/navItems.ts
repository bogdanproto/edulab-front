import { paths } from '@/consts';

import type { NavItemConfig } from '@/types/nav';

export const adminNavItems: NavItemConfig[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    href: paths.admin.dashboard,
    icon: 'dashboard',
  },
  {
    key: 'users',
    title: 'Users',
    href: paths.admin.users,
    icon: 'users',
    matcher: { type: 'startsWith', href: paths.admin.users },
  },
  {
    key: 'groups',
    title: 'Groups',
    href: paths.admin.groups,
    icon: 'groups',
    matcher: { type: 'startsWith', href: paths.admin.groups },
  },
];

export const teacherNavItems: NavItemConfig[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    href: paths.teacher.dashboard,
    icon: 'dashboard',
  },
  {
    key: 'groups',
    title: 'Groups',
    href: paths.teacher.groups,
    icon: 'groups',
    matcher: { type: 'startsWith', href: paths.teacher.groups },
  },
  {
    key: 'courses',
    title: 'Courses',
    href: paths.teacher.courses,
    icon: 'courses',
    matcher: { type: 'startsWith', href: paths.teacher.courses },
  },
  {
    key: 'tasks',
    title: 'Tasks',
    href: paths.teacher.tasks,
    icon: 'tasks',
    matcher: { type: 'startsWith', href: paths.teacher.tasks },
  },
  {
    key: 'tests',
    title: 'Tests',
    href: paths.teacher.tests,
    icon: 'tests',
    matcher: { type: 'startsWith', href: paths.teacher.tests },
  },
];

export const studentNavItems: NavItemConfig[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    href: paths.student.dashboard,
    icon: 'dashboard',
  },
  {
    key: 'courses',
    title: 'Courses',
    href: paths.student.courses,
    icon: 'courses',
    matcher: { type: 'startsWith', href: paths.student.courses },
  },
  {
    key: 'tasks',
    title: 'Tasks',
    href: paths.student.tasks,
    icon: 'tasks',
    matcher: { type: 'startsWith', href: paths.student.tasks },
  },
  {
    key: 'grades',
    title: 'Grades',
    href: paths.student.grades,
    icon: 'grades',
    matcher: { type: 'startsWith', href: paths.student.grades },
  },
];
