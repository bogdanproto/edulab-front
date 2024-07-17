import { useGetTestByIdQuery } from '@/redux/tests/testsApi';
import { List } from '@mui/material';
import { FC } from 'react';

import { Question } from '@/types/tests';

import QuestionItem from './QuestionItem';

type Props = {
  testId: number;
};

const QuestionsList: FC<Props> = ({ testId }) => {
  const { data } = useGetTestByIdQuery(testId.toString(), {
    skip: !testId,
  });

  const questions = data?.data.questions;

  return (
    <List component="ul">
      {[...(questions || [])]
        ?.sort((a, b) => Number(a.id) - Number(b.id))
        ?.map((item: Question, idx) => (
          <QuestionItem key={item.id} question={item} idx={idx} />
        ))}
    </List>
  );
};

export default QuestionsList;
