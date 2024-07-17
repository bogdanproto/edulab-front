import * as yup from 'yup';

export const schemaCreateTest = yup.object({
  title: yup.string().required('Title is required').trim(),
  description: yup.string().required('Description is required').trim(),
  maxScores: yup.number().required('Max points   is required'),
});
