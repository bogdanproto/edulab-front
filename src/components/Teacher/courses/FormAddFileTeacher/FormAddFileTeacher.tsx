import { schemaAddFile } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { Box, Button, Stack, Typography } from '@mui/material';
import { HFInput, HFInputFileUpload } from 'components/core';
import { useForm } from 'react-hook-form';
import { Lesson, MaterialCreate } from 'types/course';

type FormAddFileProps = {
  lesson: Lesson;
  handleRequest: (obj: MaterialCreate) => void;
};

type FormObj = { title: string; sourceUrl: FileList };

export const FormAddFileTeacher: React.FC<FormAddFileProps> = ({
  lesson,
  handleRequest,
}) => {
  const {
    handleSubmit,
    control,
    watch,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaAddFile),
    defaultValues: {
      title: '',
    },
  });

  const isFileUploaded = watch('sourceUrl') as FileList;

  const onSubmit = ({ title, sourceUrl }: FormObj) => {
    handleRequest({
      title,
      file: sourceUrl[0],
      lessonId: lesson.id,
      courseId: lesson.courseId,
    });
    reset();
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
            <HFInput
              name="title"
              label="Title"
              error={errors.title?.message}
              control={control}
            />

            <HFInputFileUpload
              error={errors.sourceUrl?.message}
              register={register('sourceUrl')}
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

      {isFileUploaded && isFileUploaded.length > 0 && (
        <Box display="flex" alignItems="center" mt={2}>
          <AttachFileIcon fontSize="small" />
          <Typography>{isFileUploaded[0]?.name}</Typography>
        </Box>
      )}
    </>
  );
};
