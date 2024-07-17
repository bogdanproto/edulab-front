export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
};

export type PasswordChangeData = {
  oldPassword: string;
  newPassword: string;
};

export type ImportUsersData = UserData[];

export type ResponseData = {
  status: string;
  message: string;
};

export type ResponseUserData = UserData & {
  id: number;
  avatarUrl: string;
  isSubscribedToEmails: boolean;
};

export type LoginResponseData = ResponseData & {
  accessToken: string;
  user: ResponseUserData;
};
export type LoginRequestData = {
  email: string;
  password: string;
};

export type RecoverCredentialsRequestData = {
  email: string;
};

export type RegisterRequestUserData = UserData & {
  role: string;
};

export type CreatePasswordRequestUserData = {
  email: string;
  password: string;
  activationLink: string;
};

export type ResetPasswordRequestData = PasswordChangeData & {
  email: string;
};

export type ChangePasswordRequestData = PasswordChangeData;
export type RegisterResponseData = ResponseData;
export type ChangePasswordResponseData = ResponseData;
