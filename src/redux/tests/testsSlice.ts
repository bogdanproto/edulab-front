import { createSlice } from '@reduxjs/toolkit';
import { TestSlice } from 'types/redux';

const initialState: TestSlice = {
  questionAnswersList: [],
  questionAnswersStatus: 'null',
};

const testsSlice = createSlice({
  name: 'tests',
  initialState: initialState,
  reducers: {
    setQuestionAnswersStatus(state, action) {
      state.questionAnswersStatus = action.payload;
    },
    addTestAnswer(state, action) {
      const { questionId } = action.payload;
      const existingIndex = state.questionAnswersList.findIndex(
        obj => obj.questionId === questionId
      );

      if (existingIndex !== -1) {
        state.questionAnswersList = state.questionAnswersList.map(
          (obj, index) => {
            if (index === existingIndex) {
              return action.payload;
            }

            return obj;
          }
        );
      } else {
        state.questionAnswersList.push(action.payload);
      }
    },
    clearTestAnswers(state) {
      state.questionAnswersList = [];
    },
    loadTestAnswers(state, action) {
      state.questionAnswersList = action.payload;
    },
  },
});

export const {
  setQuestionAnswersStatus,
  addTestAnswer,
  clearTestAnswers,
  loadTestAnswers,
} = testsSlice.actions;
export const testsReducer = testsSlice.reducer;
