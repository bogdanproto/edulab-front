import AddBoxIcon from '@mui/icons-material/AddBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import React from 'react';

import { FormCreateLesson } from '../FormCreateLesson/FormCreateLesson';

type AccordionNewLessonProps = {
  courseId: number;
  lessonsOrder: number;
  expanded: boolean;
  onChangeExpanded: () => void;
};

export const AccordionNewLesson: React.FC<AccordionNewLessonProps> = ({
  courseId,
  lessonsOrder,
  expanded,
  onChangeExpanded,
}) => {
  return (
    <>
      <Accordion expanded={expanded} onChange={onChangeExpanded}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="courseId">
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AddBoxIcon color="success" />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="New Lesson" secondary="Create new lesson" />
          </ListItem>
        </AccordionSummary>
        <AccordionDetails>
          <FormCreateLesson courseId={courseId} lessonsOrder={lessonsOrder} />
        </AccordionDetails>
      </Accordion>
    </>
  );
};
