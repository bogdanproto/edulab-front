import { paths } from '@/consts';
import {
  useCreateCourseMutation,
  useDeleteCourseMutation,
  useUpdateCourseMutation,
} from '@/redux/courses/coursesApi';
import { schemaCreateCourse } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack } from '@mui/material';
import { ButtonsForm, HFInput, HFInputImage, HFSwitch } from 'components/core';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Course } from 'types/course';

type FormCreateCourseProps = {
  setCourseId?: (courseId: number | null) => void;
  course?: Course;
};

type CourseForm = {
  title: string;
  description?: string;
  yearCourse: string;
  imgUrl?: FileList | null;
  isActive: boolean;
};

export const FormCreateCourse: React.FC<FormCreateCourseProps> = ({
  setCourseId,
  course,
}) => {
  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schemaCreateCourse),
    defaultValues: {
      title: course ? course.title : '',
      description: course ? course.description : '',
      yearCourse: course ? course.yearCourse : '',
      imgUrl: '',
      isActive: course ? course.isActive : false,
    },
  });

  const [isFileChange, setIsFileChange] = useState<boolean>(false);

  const navigate = useNavigate();

  const [createCourse, resultCreate] = useCreateCourseMutation();
  const [updateCourse, resultUpdate] = useUpdateCourseMutation();
  const [deleteCourse, resultDelete] = useDeleteCourseMutation();

  const onSubmit = ({
    imgUrl = null,
    description = '',
    ...data
  }: CourseForm) => {
    const file = imgUrl && imgUrl[0];

    if (course) {
      updateCourse({
        ...data,
        description,
        file: isFileChange ? file : course.imgUrl,
        id: course.id,
      });
      reset({ ...data, description, imgUrl });
    } else {
      createCourse({ ...data, description, file });
    }
  };

  useEffect(() => {
    if (resultCreate.data?.data?.id && setCourseId) {
      setCourseId(resultCreate.data?.data?.id);
    }
  }, [resultCreate.data?.data?.id, setCourseId]);

  useEffect(() => {
    if (resultDelete.data?.data?.id) {
      navigate(paths.teacher.courses);
    }
  }, [navigate, resultDelete.data?.data?.id, setCourseId]);

  useEffect(() => {
    if (
      resultCreate?.status === 'fulfilled' ||
      resultUpdate?.status === 'fulfilled'
    ) {
      reset();
      setIsFileChange(false);
    }
  }, [reset, resultCreate?.status, resultUpdate?.status]);

  return (
    <Box pb={2} sx={{ borderBottom: '1px solid lightGrey' }}>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Box sx={{ flexGrow: 1 }} display="flex" flexDirection="column">
          <HFSwitch
            name="isActive"
            label="Active"
            error={errors.isActive?.message}
            control={control}
          />
          <Grid
            container
            spacing={2}
            alignItems={{ xs: 'space-between', sm: 'flex-end' }}
            direction={{ xs: 'column', sm: 'row' }}
          >
            <Grid item xs={8} sm md lg>
              <Stack spacing={3}>
                <Grid
                  container
                  spacing={0}
                  gap={1}
                  direction={{ xs: 'column', sm: 'row' }}
                >
                  <Grid item xs={8} sm md lg>
                    <HFInput
                      name="title"
                      label="Title"
                      error={errors.title?.message}
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <HFInput
                      name="yearCourse"
                      label="Year"
                      error={errors.yearCourse?.message}
                      control={control}
                    />
                  </Grid>
                </Grid>

                <HFInput
                  name="description"
                  label="Description"
                  multiline={4}
                  error={errors.description?.message}
                  control={control}
                />
              </Stack>
            </Grid>
            <Grid item xs={1}>
              <HFInputImage
                name="imgUrl"
                sizeImg="174px"
                register={register('imgUrl')}
                actualImage={course?.imgUrl}
                onChange={setIsFileChange}
              />
            </Grid>
          </Grid>
        </Box>
        <ButtonsForm
          submitBtn={course ? 'Update' : 'Add'}
          disabled={!(isDirty || isFileChange)}
          additionalBtn={
            course
              ? {
                  title: 'Delete',
                  textConfirm: 'Course',
                  callBack: () => {
                    deleteCourse(course?.id);
                  },
                }
              : null
          }
        />
      </form>
    </Box>
  );
};
