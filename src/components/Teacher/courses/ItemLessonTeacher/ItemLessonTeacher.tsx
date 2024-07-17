import { setPreviewString } from '@/utils';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SchoolIcon from '@mui/icons-material/School';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { Lesson } from 'types/course';

import { MenuEditLesson } from '../MenuEditLesson/MenuEditLesson';

type ItemLessonTeacherProps = {
  lesson: Lesson;
};

export const ItemLessonTeacher: React.FC<ItemLessonTeacherProps> = ({
  lesson,
}) => {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="courseId">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <SchoolIcon color="primary" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`Lesson ${lesson.orderNumber}: ${lesson.title}`}
              secondary={setPreviewString(lesson.description, 50)}
            />
          </ListItem>
        </AccordionSummary>
        <AccordionDetails>
          <MenuEditLesson lesson={lesson} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
