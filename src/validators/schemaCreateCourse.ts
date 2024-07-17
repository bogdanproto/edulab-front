import * as yup from 'yup';

export const schemaCreateCourse = yup.object({
  title: yup.string().required('Title is required').trim(),
  description: yup.string().trim(),
  yearCourse: yup
    .string()
    .required('Year is required')
    .trim()
    .matches(/^\d{4}$/, 'Year must be in YYYY format'),
  imgUrl: yup.mixed(),
  isActive: yup.boolean().required(),
});
