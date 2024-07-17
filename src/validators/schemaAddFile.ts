import * as yup from 'yup';

export const schemaAddFile = yup.object({
  title: yup.string().required('Title is required').trim(),
  sourceUrl: yup
    .mixed<FileList>()
    .required('File is required')
    .test('file-length', 'Add file', value => {
      const fileArray = value as FileList;

      return fileArray.length > 0;
    }),
});
