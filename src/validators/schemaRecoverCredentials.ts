import * as yup from 'yup';

export const schemaRecoverCredentials = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      'Email must be a valid email address'
    ),
});
