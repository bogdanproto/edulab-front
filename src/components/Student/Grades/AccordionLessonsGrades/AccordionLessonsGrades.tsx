import KeyboardArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Box,
} from '@mui/material';
import { Task } from 'types/task';

import AverageCourseGrade from '../AverageCourseGrade';
import StudentGradeLessons from '../StudentGradeLessons';

interface AccordionLessonsGradesProps {
  courseTitle: string;
  lessons: { [lessonTitle: string]: Task[] };
}
const AccordionLessonsGrades: React.FC<AccordionLessonsGradesProps> = ({
  courseTitle,
  lessons,
}) => {
  const allGrades = Object.values(lessons).flatMap(tasks =>
    tasks.flatMap(task => (task.grade !== null ? [task.grade] : []))
  );

  return (
    <Accordion key={courseTitle}>
      <AccordionSummary
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        expandIcon={<KeyboardArrowDownRounded htmlColor="#1976d2" />}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <AverageCourseGrade grades={allGrades} />
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontWeight: 'bold',
            }}
          >
            Course: {courseTitle}
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails sx={{ p: { xs: '8px', md: 3 } }}>
        <StudentGradeLessons lessons={lessons} />
      </AccordionDetails>
    </Accordion>
  );
};
export default AccordionLessonsGrades;
