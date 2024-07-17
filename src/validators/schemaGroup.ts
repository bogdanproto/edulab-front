/* eslint-disable max-len */

import * as yup from 'yup';

const schemaGroup = yup.object().shape({
  id: yup
    .number()
    .integer()
    .optional()
    .nullable()
    .transform((_, val) => (val === Number(val) ? val : null)),
  name: yup
    .string()
    .required('Group name is required')
    .min(2, 'Must be at least 2 characters')
    .max(30, 'Must be at most 30 characters'),
});

export default schemaGroup;
