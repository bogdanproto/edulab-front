import * as yup from 'yup';

export const schemaSigninUser = yup.object({
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
});
