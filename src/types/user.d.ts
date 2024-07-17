import Role from 'types/role';

export type User = {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  isActivated?: boolean | string;
  activationLink?: string | null;
  role: Role;
  avatarUrl?: string;
  isSubscribedToEmails?: boolean | string;
  groupNames?: string[] | null;
};

export type UserUpdate = {
  id: number | string;
  role: Role;
  file?: File | string | null;
  firstName?: string;
  lastName?: string;
  email?: string;
  isActivated?: boolean | string;
  activationLink?: string | null;
  avatarUrl?: string;
  isSubscribedToEmails?: boolean | string;
  groupNamess?: string[] | null;
};

export type StudentToRegister = {
  id: string;
  firstName: string;
  lastName: string;
  groupName: string;
  email: string;
};

export type AddUser = Omit<
  User,
  'isActivated' | 'groupNames' | 'activationLink'
>;
