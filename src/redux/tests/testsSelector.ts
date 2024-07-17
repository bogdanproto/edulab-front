import { RootState } from '@/redux/store';

export const selectQuestionAnswersList = (state: RootState) =>
  state.tests.questionAnswersList;

export const selectQuestionAnswersStatus = (state: RootState) =>
  state.tests.questionAnswersStatus;
