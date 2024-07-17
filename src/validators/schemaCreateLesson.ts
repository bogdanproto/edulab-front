import * as yup from 'yup';

export const schemaCreateLesson = yup.object({
  title: yup.string().required('Title is required').trim(),
  description: yup.string().trim(),
});
