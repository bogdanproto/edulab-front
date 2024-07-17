import {
  useCreateLessonMutation,
  useDeleteLessonMutation,
  useUpdateLessonMutation,
} from '@/redux/courses';
import { schemaCreateLesson } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack } from '@mui/material';
import { ButtonsForm, HFInput } from 'components/core';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Lesson } from 'types/course';

type FormCreateLessonProps = {
  courseId: number;
  lessonsOrder?: number;
  lesson?: Lesson;
};

type LessonForm = {
  title: string;
  description?: string;
};

export const FormCreateLesson: React.FC<FormCreateLessonProps> = ({
  courseId,
  lessonsOrder = 1,
  lesson,
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schemaCreateLesson),

    defaultValues: {
      title: lesson ? lesson.title : '',
      description: lesson ? lesson.description : '',
    },
  });

  const [createLesson, result] = useCreateLessonMutation();
  const [updateLesson] = useUpdateLessonMutation();
  const [deleteCourse] = useDeleteLessonMutation();

  const onSubmit = (data: LessonForm) => {
    const newLesson = {
      ...data,
      description: data.description || '',
      orderNumber: lessonsOrder,
    };
    if (lesson) {
      updateLesson({ ...newLesson, courseId: lesson.courseId, id: lesson.id });
      reset(data);
    } else {
      createLesson({ ...newLesson, courseId });
    }
  };

  useEffect(() => {
    if (result?.status === 'fulfilled') {
      reset();
    }
  }, [reset, result?.status]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <Stack spacing={3}>
        <HFInput
          name="title"
          label="Title"
          error={errors.title?.message}
          control={control}
        />

        <HFInput
          name="description"
          label="Description"
          multiline={4}
          error={errors.description?.message}
          control={control}
        />
      </Stack>

      <ButtonsForm
        submitBtn={lesson ? 'Update' : 'Add'}
        disabled={!isDirty}
        additionalBtn={
          lesson
            ? {
                title: 'Delete',
                textConfirm: 'Lesson',
                callBack: () => {
                  deleteCourse({ id: lesson.id, courseId: lesson.courseId });
                },
              }
            : null
        }
      />
    </form>
  );
};
