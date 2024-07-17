/* eslint-disable sonarjs/no-duplicate-string */
import * as yup from 'yup';

export const schemaResetPassword = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Email must be a valid email address'
    ),
  currentPassword: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long'
    ),
  newPassword: yup
    .string()
    .required('New password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long'
    )
    .test(
      'passwords-match',
      'New password must not match current password',
      function (value, context) {
        const { currentPassword } = context.parent;

        return value !== currentPassword;
      }
    ),
  confirmPassword: yup
    .string()
    .required('Need to confirm new password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match')
    .test('passwords-match', 'Passwords must match', function (value, context) {
      const { newPassword } = context.parent;

      return value === newPassword;
    }),
});

export const schemaCreatePassword = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Email must be a valid email address'
    ),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long'
    ),
  confirmPassword: yup
    .string()
    .required('New password is required')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long'
    )
    .test(
      'passwords-match',
      'Confirm password must match password',
      function (value, context) {
        const { password } = context.parent;

        return value === password;
      }
    ),
});
