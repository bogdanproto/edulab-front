import { schemaAddTestToLesson } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Stack } from '@mui/material';
import { HFAutocompleateSearch } from 'components/core';
import { useForm } from 'react-hook-form';
import { Lesson, assignTestToLesson } from 'types/course';

export type ItemAutocomplete = {
  id: number;
  title: string;
};

type FormAddTestToLessonProps = {
  list: ItemAutocomplete[];
  lesson: Lesson;
  handleRequest: (obj: assignTestToLesson) => void;
};

type FormObj = { test: { id: number; title: string } };

export const FormAddTestToLesson: React.FC<FormAddTestToLessonProps> = ({
  list,
  lesson: { id: lessonId, courseId },
  handleRequest,
}) => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schemaAddTestToLesson),
  });

  const onSubmit = (data: FormObj) => {
    handleRequest({ lessonId, courseId, testId: data.test.id });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Stack
          justifyContent="space-between"
          alignItems="center"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 4, sm: 2, md: 4 }}
        >
          <Box width="100%" display="flex" alignItems="center">
            <HFAutocompleateSearch
              name="test"
              label="Test"
              control={control}
              options={list}
            />
          </Box>

          <Button
            variant="contained"
            type="submit"
            sx={{
              width: { xs: '100%', sm: 'initial' },
            }}
          >
            Add
          </Button>
        </Stack>
      </form>
    </>
  );
};
