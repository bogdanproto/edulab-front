import * as yup from 'yup';

export const schemaAddTestToLesson = yup.object({
  test: yup
    .object({
      id: yup.number().required('Test ID is required'),
      title: yup.string().required('Test title is required').trim(),
    })
    .required('Test is required'),
});
