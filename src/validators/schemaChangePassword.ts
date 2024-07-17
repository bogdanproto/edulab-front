import * as yup from 'yup';

export const schemaChangePassword = yup.object({
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
