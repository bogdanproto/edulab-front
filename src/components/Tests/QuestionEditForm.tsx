import {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} from '@/redux/tests/testsApi';
import { schemaAddQuestion } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Grid,
  Radio,
  Checkbox,
  IconButton,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { HFInput, HFInputImage, Popconfirm } from 'components/core';
import { FC, useEffect, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  useFieldArray,
  Resolver,
  Controller,
} from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Answer, Question, TypeQuestion } from 'types/tests.d';

type Inputs = {
  questionText: string;
  questionType: TypeQuestion;
  imgUrl: string;
  answerOptions: Answer[];
};

type Props = {
  btnCaption?: string;
  question?: Question;
  onChangeExpanded: () => void;
};

const QuestionEditForm: FC<Props> = ({
  btnCaption,
  question,
  onChangeExpanded,
}) => {
  const { testId = 0 } = useParams();
  const [selectedValue, setSelectedValue] = useState('');
  const [disabledUpdate, setDisabledUpdate] = useState(false);
  const [isFileChange, setIsFileChange] = useState<boolean>(false);
  const [typeQuestion, setTypeQuestion] = useState<TypeQuestion>(
    question?.questionType || TypeQuestion.single
  );

  const [updateQuestion] = useUpdateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const [addQuestion, result] = useAddQuestionMutation();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
    reset,
  } = useForm<Inputs>({
    resolver: yupResolver(schemaAddQuestion) as Resolver<Inputs>,
    defaultValues: {
      questionText: question?.questionText || '',
      questionType: question?.questionType || TypeQuestion.single,
      imgUrl: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'answerOptions',
  });

  const onSubmit: SubmitHandler<Inputs> = ({ imgUrl = null, ...data }) => {
    const file = imgUrl && imgUrl[0];

    const newAnswerOptions = data.answerOptions.map(item => {
      const { answerId, ...rest } = item;

      return { id: answerId, ...rest };
    });

    if (question?.id) {
      updateQuestion({
        id: question.id,
        data: {
          ...data,
          answerOptions: newAnswerOptions,
          testId,
          file: isFileChange ? file : question.imgUrl,
        },
      });
    } else {
      addQuestion({
        ...data,
        answerOptions: newAnswerOptions,
        testId,
        file,
      });
      reset();
      onChangeExpanded();
    }
  };

  const handleChangeTypyQuestion = (value: string) => {
    if (value) setTypeQuestion(value as TypeQuestion);
  };

  const handleSelected = (id: string) => {
    setSelectedValue(id);

    fields.forEach((field, index) => {
      if (field.id === id) {
        setValue(`answerOptions.${index}.isCorrect`, true);
        setDisabledUpdate(false);
      } else {
        setValue(`answerOptions.${index}.isCorrect`, false);
      }
    });
  };

  useEffect(() => {
    if (question && fields.length === 0) {
      question?.answerOptions.forEach(answer => {
        if (
          !(
            fields.find(field => field.answerId === answer.id) ||
            fields.find(field => field.answerText === answer.answerText)
          )
        ) {
          append({
            answerId: answer.id,
            answerText: answer.answerText,
            isCorrect: answer.isCorrect,
          });
        }
      });

      setDisabledUpdate(!fields.some(item => item.isCorrect));
    }
  }, [question, append, setValue, fields]);

  useEffect(() => {
    fields.forEach(field => {
      if (field.isCorrect) {
        setSelectedValue(field.id);
      }
    });

    setDisabledUpdate(!fields.some(item => item.isCorrect));
  }, [fields]);

  useEffect(() => {
    let isTrue = false;
    if (typeQuestion === TypeQuestion.single) {
      fields.forEach((field, index) => {
        if (field.isCorrect) {
          setValue(`answerOptions.${index}.isCorrect`, false);

          if (!isTrue) {
            setValue(`answerOptions.${index}.isCorrect`, true);
            setSelectedValue(field.id);
          }
          isTrue = true;
        }
      });
    }

    if (typeQuestion === TypeQuestion.open) {
      fields.forEach((_, index) => {
        if (index > 0) {
          remove(index);
        }
      });
    }
  }, [typeQuestion, fields, setValue, remove]);

  useEffect(() => {
    if (fields.length < 2 && typeQuestion !== TypeQuestion.open && !question) {
      append({ answerText: '', isCorrect: false });
    }
  }, [append, fields.length, typeQuestion, question]);

  useEffect(() => {
    if (result?.status === 'fulfilled') {
      reset();
      setSelectedValue('');
      setIsFileChange(false);
    }
  }, [reset, result?.status, isFileChange]);

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <Grid
            container
            spacing={0}
            gap={2}
            alignItems={{ xs: 'space-between', sm: 'flex-end' }}
            direction={{ xs: 'column', sm: 'row' }}
          >
            <Grid item xs sm md lg>
              <Stack spacing={3}>
                <HFInput
                  label="Question"
                  name="questionText"
                  multiline={4}
                  control={control}
                  error={errors.questionText?.message}
                />

                <FormControl fullWidth size="small">
                  <InputLabel id="select-label">
                    Select question type
                  </InputLabel>
                  <Controller
                    name="questionType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        labelId="select-label"
                        label="Select question type"
                        value={typeQuestion}
                        onChange={event => {
                          field.onChange(event);
                          handleChangeTypyQuestion(event.target.value);
                        }}
                      >
                        <MenuItem value={TypeQuestion.single}>
                          Single correct answer
                        </MenuItem>
                        <MenuItem value={TypeQuestion.many}>
                          Many correct answers
                        </MenuItem>
                        <MenuItem value={TypeQuestion.open}>
                          Open ended question
                        </MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <HFInputImage
                name="imgUrl"
                sizeImg="174px"
                register={register('imgUrl')}
                actualImage={question?.imgUrl}
                onChange={setIsFileChange}
              />
            </Grid>
          </Grid>

          <Stack spacing={3}>
            {fields.map((field, index) => (
              <Stack direction="row" key={field.id}>
                {errors && (
                  <Typography
                    display="block"
                    variant="caption"
                    color="error"
                    sx={{ position: 'absolute' }}
                  >
                    {errors.answerOptions &&
                      errors.answerOptions[index] &&
                      errors.answerOptions[index]?.answerText &&
                      errors.answerOptions[index]?.isCorrect?.message}
                  </Typography>
                )}

                <HFInput
                  name={`answerOptions.${index}.answerText`}
                  label={`Answer ${index + 1}`}
                  control={control}
                  multiline={2}
                  error={
                    errors.answerOptions &&
                    errors.answerOptions[index] &&
                    errors.answerOptions[index]?.answerText &&
                    errors.answerOptions[index]?.answerText?.message
                  }
                />

                {typeQuestion === TypeQuestion.single && (
                  <Radio
                    checked={selectedValue === field.id}
                    onChange={() => handleSelected(field.id)}
                    value={field.id}
                    inputProps={{ 'aria-label': field.id }}
                    name="isCorrect"
                  />
                )}
                {typeQuestion === TypeQuestion.many && (
                  <Checkbox
                    {...register(`answerOptions.${index}.isCorrect`)}
                    defaultChecked={fields[index].isCorrect}
                  />
                )}
                {typeQuestion !== TypeQuestion.open && (
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                    onClick={() => {
                      remove(index);
                      setSelectedValue('');
                    }}
                    id={field.id}
                    disabled={fields.length <= 2}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Stack>
            ))}
            <Grid container justifyContent="flex-start">
              {typeQuestion !== TypeQuestion.open && (
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => append({ answerText: '', isCorrect: false })}
                >
                  Add Answer
                </Button>
              )}
            </Grid>
          </Stack>

          <Grid container justifyContent="flex-end" gap={2}>
            {question && (
              <Popconfirm
                title="Delete the question"
                description="Are you sure to delete this question?"
                onConfirm={() => deleteQuestion(question.id as number)}
              >
                <Button variant="contained" type="button">
                  Delete question
                </Button>
              </Popconfirm>
            )}
            <Button
              variant="contained"
              type="submit"
              disabled={
                !(isDirty || disabledUpdate) ||
                (!selectedValue && typeQuestion === TypeQuestion.single)
              }
            >
              {btnCaption ? btnCaption : 'Add question'}
            </Button>
          </Grid>
        </Stack>
      </form>
    </Box>
  );
};

export default QuestionEditForm;
