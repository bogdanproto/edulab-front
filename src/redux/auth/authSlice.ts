import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Role } from 'types/role.d';

export type User = {
  id: number | null;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  isSubscribedToEmails: boolean;
  role: Role | '';
};

export type AuthState = {
  token: string | null;
  isLoggedIn: boolean;
  user: User;
};

const initialState: AuthState = {
  token: null,
  isLoggedIn: false,
  user: {
    id: null,
    firstName: '',
    lastName: '',
    email: '',
    avatarUrl: '',
    isSubscribedToEmails: false,
    role: '',
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveAuthData: (state, action) => {
      state.token = action.payload.accessToken;
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    resetAuthData: state => {
      state.token = null;
      state.isLoggedIn = false;
      state.user = initialState.user;
    },
    updateAvatarUrl: (state, action: PayloadAction<string>) => {
      state.user.avatarUrl = action.payload;
    },
  },
});

export const { resetAuthData, saveAuthData, updateAvatarUrl } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
