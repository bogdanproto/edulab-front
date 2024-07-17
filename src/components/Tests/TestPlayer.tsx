import { useTypeDispatch } from '@/hooks';
import {
  useAddTestResultMutation,
  useCheckTestResultMutation,
  useGetTestByIdQuery,
  useGetTestByTaskIdQuery,
  useGetTestResultByTaskIdQuery,
} from '@/redux/tests/testsApi';
import {
  selectQuestionAnswersList,
  selectQuestionAnswersStatus,
} from '@/redux/tests/testsSelector';
import {
  addTestAnswer,
  clearTestAnswers,
  loadTestAnswers,
  setQuestionAnswersStatus,
} from '@/redux/tests/testsSlice';
import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  Checkbox,
  RadioGroup,
  Stack,
  Typography,
  TextField,
} from '@mui/material';
import { Modal, Popconfirm } from 'components/core';
import { NotFoundPage } from 'pages/index';
import { FC, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CreateTestResult, TypeQuestion } from 'types/tests.d';

import TestProgress from './TestProgress';
import TestResultMessage from './TestResultMessage';

const getColorForAnswerOption = (
  status: string,
  isTtrue: boolean,
  checked: boolean
) => {
  if (status !== 'done') return 'black';
  if (status === 'done' && isTtrue) return 'green';
  if (status === 'done' && !isTtrue && checked) return 'red';

  return 'black';
};

type Props = {
  testId?: number;
  taskId?: number;
  cancelRedirectTo?: string;
  disabledSendBtn?: boolean;
};

const TestPlayer: FC<Props> = ({
  testId,
  taskId,
  cancelRedirectTo,
  disabledSendBtn,
}) => {
  const [showImgModal, setShowImgModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [scores, setScores] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const navigate = useNavigate();

  let test;

  const {
    data: dataByTask,
    isLoading: isLoadingTestByTaskId,
    error: errorByTaskId,
  } = useGetTestByTaskIdQuery(taskId?.toString() || '', {
    skip: !taskId,
  });

  const {
    data: dataByTest,
    isLoading: isLoadingTestById,
    error: errorById,
  } = useGetTestByIdQuery(testId?.toString() || '', {
    skip: !testId,
  });

  const [addTestResult, result] = useAddTestResultMutation();
  const [checkTestResult, resultCheck] = useCheckTestResultMutation();

  const { data: dataByTestResult } = useGetTestResultByTaskIdQuery(
    taskId?.toString() || '',
    {
      skip: !taskId,
    }
  );

  if (taskId) {
    test = dataByTask?.data;
  }

  if (testId) {
    test = dataByTest?.data;
  }

  const questionAnswersList = useSelector(selectQuestionAnswersList);
  const questionAnswersStatus = useSelector(selectQuestionAnswersStatus);

  const questions = test?.questions || [];
  const question = questions[questionIdx];
  const answersOptions = question?.answerOptions;
  const testResult = dataByTestResult?.data;

  const questionAnswer = questionAnswersList?.find(
    item => item.questionId === question?.id
  );

  const dispatch = useTypeDispatch();

  const handleChange = (answerId: number) => {
    if (questionAnswersStatus === 'done' || disabledSendBtn) return;

    dispatch(
      addTestAnswer({ questionId: question?.id, answers: [{ answerId }] })
    );
  };

  const handleChangeCheckbox = (answerId: number) => {
    if (questionAnswersStatus === 'done' || disabledSendBtn) return;

    let values: number[] =
      questionAnswer?.answers.map(value => value.answerId) || [];

    if (values.includes(answerId)) {
      values = [...values.filter(value => value !== answerId)];
    } else {
      values.push(answerId);
    }

    dispatch(
      addTestAnswer({
        questionId: question?.id,
        answers: values.map(value => {
          return { answerId: value };
        }),
      })
    );
  };

  const handleChangeOpen = (answerText: string) => {
    if (questionAnswersStatus === 'done' || disabledSendBtn) return;

    dispatch(
      addTestAnswer({
        questionId: question?.id,
        answers: [{ answerId: question?.answerOptions[0].id, answerText }],
      })
    );
  };

  const handleAddTestResult = async () => {
    const testResultObj: CreateTestResult = {
      testId: testId || 0,
      taskId: taskId || 0,
      answers: questionAnswersList,
    };

    if (taskId) {
      await addTestResult(testResultObj);
    } else {
      await checkTestResult(testResultObj);
    }
  };

  useEffect(() => {
    dispatch(clearTestAnswers());
  }, [dispatch]);

  useEffect(() => {
    if (testResult) {
      dispatch(loadTestAnswers(testResult.answers));
      dispatch(setQuestionAnswersStatus(testResult.status));
    }
    if (!taskId) {
      dispatch(setQuestionAnswersStatus('null'));
    }
  }, [dispatch, testResult, taskId]);

  useEffect(() => {
    if (result && result.status === 'fulfilled') {
      const {
        data: { data },
      } = result;

      setTotalQuestions(data.totalQuestions);
      setCorrectAnswers(data.correctAnswers);
      setScores(data.scores);
      setShowResultModal(true);
    }
  }, [result]);

  useEffect(() => {
    if (resultCheck && resultCheck.status === 'fulfilled') {
      const {
        data: { data },
      } = resultCheck;

      if (!data) return;

      setTotalQuestions(data.totalQuestions);
      setCorrectAnswers(data.correctAnswers);
      setScores(data.scores);
      setShowResultModal(true);
    }
  }, [resultCheck]);

  const handleCopy = useCallback(
    (event: React.ClipboardEvent<HTMLDivElement>) => {
      event.preventDefault();

      toast.error('Copying is prohibited!');
    },
    []
  );

  const textReturnBtn = taskId ? 'Return to task' : 'Return';

  if (isLoadingTestById || isLoadingTestByTaskId) {
    return <div>Loading...</div>;
  }

  if (
    (errorById && 'status' in errorById && errorById.status === 404) ||
    (errorByTaskId && 'status' in errorByTaskId && errorByTaskId.status === 404)
  ) {
    return <NotFoundPage />;
  }

  return (
    <Box
      onCopy={handleCopy}
      onContextMenu={e => {
        e.preventDefault();
      }}
      sx={{
        userSelect: 'none',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        '@media print': {
          display: 'none',
        },
      }}
    >
      <Typography variant="h5" component="h2" mt={2} mb={2}>
        {test?.title}
      </Typography>
      {test && question && (
        <>
          <TestProgress
            count={
              questionAnswersStatus === 'done'
                ? testResult?.correctAnswers || 0
                : questionAnswersList.length
            }
            total={questions?.length || 0}
          />
          <Typography variant="h6" component="p" mt={2} mb={2}>
            {question.questionText}
          </Typography>

          {question?.imgUrl && (
            <Box
              borderRadius="4px"
              overflow="hidden"
              mb={2}
              onClick={() => setShowImgModal(true)}
              sx={{
                width: { xs: 200 },
                height: { xs: 100 },
              }}
            >
              <img
                src={question.imgUrl}
                alt={question.questionText}
                style={{
                  cursor: 'pointer',
                  objectFit: 'cover',
                  height: '100%',
                }}
              />
            </Box>
          )}

          <Modal
            isOpenModal={showImgModal}
            setOpenModal={setShowImgModal}
            padding={0}
          >
            <img src={question.imgUrl} alt={question.questionText} />
          </Modal>

          {question.questionType === TypeQuestion.single && (
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <Stack spacing={2}>
                {answersOptions &&
                  answersOptions.map(answer => (
                    <FormControlLabel
                      key={answer.id}
                      value={answer.answerText}
                      sx={{
                        color: getColorForAnswerOption(
                          questionAnswersStatus,
                          answer.isCorrect,
                          !!questionAnswer?.answers.find(
                            item => item.answerId === answer.id
                          )
                        ),
                      }}
                      control={
                        <Radio
                          onChange={() => handleChange(Number(answer?.id))}
                          checked={
                            !!questionAnswer?.answers.find(
                              item => item.answerId === answer.id
                            )
                          }
                        />
                      }
                      label={answer.answerText}
                    />
                  ))}
              </Stack>
            </RadioGroup>
          )}

          {question.questionType === TypeQuestion.many && (
            <Stack spacing={2}>
              {answersOptions &&
                answersOptions.map(answer => (
                  <FormControlLabel
                    onChange={() => handleChangeCheckbox(Number(answer?.id))}
                    key={answer.id}
                    value={answer.id}
                    sx={{
                      color: getColorForAnswerOption(
                        questionAnswersStatus,
                        answer.isCorrect,
                        !!questionAnswer?.answers.find(
                          item => item.answerId === answer.id
                        )
                      ),
                    }}
                    control={
                      <Checkbox
                        checked={
                          !!questionAnswer?.answers.find(
                            item => item.answerId === answer.id
                          )
                        }
                      />
                    }
                    label={answer.answerText}
                  />
                ))}
            </Stack>
          )}

          {question.questionType === TypeQuestion.open && (
            <Stack spacing={2}>
              <TextField
                id="outlined-basic"
                label="Answer"
                variant="outlined"
                onChange={e => handleChangeOpen(e.target.value)}
                value={questionAnswer?.answers[0].answerText || ''}
              />
              {questionAnswersStatus === 'done' && (
                <Typography
                  component="p"
                  sx={{
                    color: getColorForAnswerOption(
                      questionAnswersStatus,
                      questionAnswer?.answers[0].answerText ===
                        question.answerOptions[0].answerText,
                      true
                    ),
                  }}
                >
                  Correct answer: {question.answerOptions[0].answerText}
                </Typography>
              )}
            </Stack>
          )}

          <Stack direction="row" justifyContent="space-between" mt={2}>
            <Button
              variant="contained"
              type="button"
              onClick={() => setQuestionIdx(questionIdx - 1)}
              disabled={questionIdx === 0}
            >
              Prev
            </Button>
            <Button
              variant="contained"
              type="button"
              onClick={() => setQuestionIdx(questionIdx + 1)}
              disabled={questionIdx > Number(questions.length) - 2}
            >
              Next
            </Button>
          </Stack>

          <Modal
            isOpenModal={showResultModal}
            setOpenModal={setShowResultModal}
          >
            <TestResultMessage
              totalQuestons={totalQuestions}
              correctAnswers={correctAnswers}
              scores={scores}
              cancelRedirectTo={cancelRedirectTo}
              onClose={() => setShowResultModal(false)}
              isTask={!!taskId}
            />
          </Modal>
        </>
      )}
      {test && questions.length === 0 && (
        <Typography variant="h6" component="p" mt={2} mb={2}>
          Question not found
        </Typography>
      )}
      {!disabledSendBtn && (
        <Stack direction="row" justifyContent="space-between" mt={2}>
          <div>
            {cancelRedirectTo && (
              <Popconfirm
                title={textReturnBtn}
                description={
                  taskId
                    ? 'Are you sure to return to task? Unsaved data will be lost!'
                    : 'Are you sure to return to test list?'
                }
                onConfirm={() => navigate(cancelRedirectTo)}
              >
                <Button variant="contained" type="button">
                  {textReturnBtn}
                </Button>
              </Popconfirm>
            )}
          </div>
          <div>
            {test && questionAnswersStatus !== 'done' && (
              <Popconfirm
                title="Send the test"
                description="Are you sure to send this test?"
                onConfirm={handleAddTestResult}
              >
                <Button
                  variant="contained"
                  type="button"
                  onClick={() => setQuestionIdx(questionIdx - 1)}
                  disabled={
                    questions.length !== questionAnswersList.length ||
                    questionAnswersStatus === 'done' ||
                    questions.length === 0
                  }
                >
                  Send test
                </Button>
              </Popconfirm>
            )}
          </div>
        </Stack>
      )}
    </Box>
  );
};

export default TestPlayer;
