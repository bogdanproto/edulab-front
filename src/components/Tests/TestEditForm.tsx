import {
  useCreateTestMutation,
  useUpdateTestMutation,
} from '@/redux/tests/testsApi';
import { schemaCreateTest } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Stack } from '@mui/material';
import { HFInput } from 'components/core';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CreateTest, Test } from 'types/tests';

type Props = {
  setOpenEditModal?: (value: boolean) => void;
  btnCaption?: string;
  testId?: number;
  data?: Test;
};

const TestEditForm: FC<Props> = ({
  setOpenEditModal,
  btnCaption,
  testId = 0,
  data,
}) => {
  const [updateTest] = useUpdateTestMutation();
  const [createTest] = useCreateTestMutation();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreateTest>({
    resolver: yupResolver(schemaCreateTest),
    defaultValues: {
      title: data?.title || '',
      description: data?.description || '',
      maxScores: data?.maxScores || 100,
    },
  });

  const onSubmit: SubmitHandler<CreateTest> = data => {
    if (testId === 0) {
      createTest(data);
    } else {
      updateTest({ testId, data });
    }

    if (setOpenEditModal) {
      setOpenEditModal(false);
    }
  };

  return (
    <Box
      sx={
        setOpenEditModal && {
          width: { xs: '240px', sm: '400px', md: '500px', lg: '600px' },
        }
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid item xs={8} sm md lg mt={2}>
          <Stack spacing={3}>
            <HFInput
              name="title"
              label="Title"
              error={errors.title?.message}
              control={control}
            />
            <HFInput
              name="maxScores"
              label="Max scores"
              control={control}
              error={errors.maxScores?.message}
            />

            <HFInput
              name="description"
              label="Description"
              multiline={4}
              control={control}
              error={errors.description?.message}
            />
          </Stack>
        </Grid>
        <Grid container justifyContent="flex-end" mt={2}>
          <Button variant="contained" type="submit" disabled={!isDirty}>
            {btnCaption ? btnCaption : 'Add test'}
          </Button>
        </Grid>
      </form>
    </Box>
  );
};

export default TestEditForm;
