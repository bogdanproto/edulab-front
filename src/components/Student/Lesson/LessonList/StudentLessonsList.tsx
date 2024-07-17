import { paths } from '@/consts';
import { useGetCoursesByIdQuery } from '@/redux/courses';
import SchoolIcon from '@mui/icons-material/School';
import {
  ListItemAvatar,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { CourseTitle } from 'components/Student/Course';
import CustomButton from 'components/Student/Course/CustomButton';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Lesson } from 'types/course';

const StudentLessonsList: React.FC = () => {
  const { courseId = '' } = useParams<{ courseId: string }>();
  const numericId = Number(courseId);

  const { data: courseInfo, isLoading } = useGetCoursesByIdQuery(numericId);

  const navigate = useNavigate();

  if (!courseInfo?.data.lessons)
    return <Typography>Error occurred or no data available</Typography>;

  const handleButtonClick = (lesson: Lesson) => {
    const lessonPath = paths.student.lesson
      .replace(':courseId', courseId)
      .replace(':lessonId', lesson.id.toString());
    navigate(lessonPath, {
      state: { lesson, courseTitle: courseInfo.data.title },
    });
  };

  return (
    !isLoading && (
      <>
        <CourseTitle title={courseInfo.data.title} />
        <List>
          {courseInfo.data.lessons.map((lesson: Lesson) => (
            <React.Fragment key={lesson.id}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <SchoolIcon color="primary" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={lesson.title}
                  secondary={lesson.description}
                />
                <CustomButton
                  maxWidth="80px"
                  onClick={() => handleButtonClick(lesson)}
                >
                  View
                </CustomButton>
              </ListItem>
              <Divider component="li" key={lesson.id} />
            </React.Fragment>
          ))}
        </List>
      </>
    )
  );
};

export default StudentLessonsList;
