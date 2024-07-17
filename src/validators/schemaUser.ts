/* eslint-disable max-len */
/* eslint-disable no-control-regex */

import { Role } from 'types/role.d';
import * as yup from 'yup';

const emailRegex =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
const passwordRegex = /^(?=.*[a-zA-Z]).{8,30}$/;
const latinAndCyrillicRegex = /^[\p{L}'\-\s]+$/u;

const userSchema = yup.object().shape({
  id: yup.mixed().nullable(),
  firstName: yup
    .string()
    .matches(
      latinAndCyrillicRegex,
      'Must contain only Latin or Cyrillic characters'
    )
    .min(2, 'Must be at least 2 characters')
    .max(30, 'Must be at most 30 characters')
    .required(),
  lastName: yup
    .string()
    .matches(
      latinAndCyrillicRegex,
      'Must contain only Latin or Cyrillic characters'
    )
    .min(2, 'Must be at least 2 characters')
    .max(30, 'Must be at most 30 characters')
    .required(),
  email: yup.string().email().matches(emailRegex, 'Invalid email').required(),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(64, 'Password must be at most 64 characters')
    .matches(passwordRegex, 'Password must contain only Latin characters')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(
      /[@#$%^&+=!]/,
      'Password must contain at least one of the following symbols: "@#$%^&+=!"'
    )
    .optional(),
  isActivated: yup.boolean().optional().nullable(),
  activationLink: yup.string().optional().nullable(),
  role: yup.string().oneOf(Object.values(Role)).required(),
  avatarUrl: yup.string().optional().nullable(),
  isSubscribedToEmails: yup.string().optional().nullable(),
  groupNames: yup.array().of(yup.string()).nullable(),
});

export default userSchema;
