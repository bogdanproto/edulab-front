import { paths } from '@/consts';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
} from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Course } from '@/types/course';

import CustomButton from '../CustomButton';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({
  course: { id: courseId, title, description, imgUrl },
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const coursePath = paths.student.lessons.replace(
      ':courseId',
      courseId.toString()
    );

    navigate(coursePath);
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        height: 320,
      }}
    >
      <CardMedia
        component="img"
        image={imgUrl ? imgUrl : 'https://i.ibb.co/60VL44W/Placeholder-1.png'}
        alt="Course Image"
        sx={{
          height: '40%',
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '50%',
        }}
      >
        <Typography
          gutterBottom
          component="div"
          sx={{
            height: '60px',
            marginBottom: '5px',
            textOverflow: 'ellipsis',
            whiteSpace: 'wrap',
            fontSize: '1 rem',
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            height: '40px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',

            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          paddingTop: '8px',
          paddingBottom: '16px',
        }}
      >
        <CustomButton onClick={handleButtonClick} maxWidth="45%">
          details
        </CustomButton>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
