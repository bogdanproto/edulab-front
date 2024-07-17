import * as yup from 'yup';

export const schemaAddQuestion = yup.object({
  questionText: yup.string().required('Question Text is required').trim(),
  questionType: yup
    .string()
    .oneOf(['single', 'many', 'open'])
    .required('Question type is required'),
  imgUrl: yup.mixed(),
  answerOptions: yup.array().of(
    yup.object().shape({
      answerText: yup.string().required('Answer text is required').trim(),
      isCorrect: yup.boolean().required(),
    })
  ),
});
