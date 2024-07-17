import { paths } from '@/consts';
import { useDeleteCourseMutation } from '@/redux/courses/coursesApi';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import {
  Avatar,
  Badge,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
} from '@mui/material';
import { Popconfirm } from 'components/core';
import { Link } from 'react-router-dom';
import { CourseTeacher } from 'types/course';

type ItemCoursTeacherProps = {
  course: CourseTeacher;
};

export const ItemCoursTeacher: React.FC<ItemCoursTeacherProps> = ({
  course: { id, title, yearCourse, imgUrl, isActive },
}) => {
  const [deleteCourse] = useDeleteCourseMutation();

  return (
    <ListItem
      secondaryAction={
        <Stack direction="row" spacing={1}>
          <IconButton
            edge="end"
            aria-label="edit"
            component={Link}
            to={`${paths.teacher.courses}/${id}`}
            sx={{
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <EditIcon />
          </IconButton>

          <Popconfirm
            title="Delete the course"
            description={`Are you sure to delete ${title} course`}
            onConfirm={() => deleteCourse(id)}
          >
            <IconButton
              edge="end"
              aria-label="delete"
              sx={{
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Popconfirm>
        </Stack>
      }
      sx={{ borderBottom: '1px solid lightGrey', paddingRight: '96px' }}
    >
      <ListItemAvatar>
        <Badge badgeContent={isActive ? '' : 0} variant="dot" color="success">
          <Avatar alt={title} src={imgUrl}>
            <LocalLibraryIcon />
          </Avatar>
        </Badge>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={isActive ? yearCourse : 'in developing'}
      />
    </ListItem>
  );
};
