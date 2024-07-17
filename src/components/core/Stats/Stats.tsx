import { useGetCoursesQuery } from '@/redux/courses';
import { tasksApi } from '@/redux/tasks';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  CardMedia,
  List,
  ListItem,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Task } from 'types/task';

interface StatsData {
  [courseTitle: string]: {
    homework: {
      null: number;
      done: number;
      check: number;
    };
    test: {
      null: number;
      done: number;
      check: number;
    };
  };
}

const Stats = () => {
  const { data: { data: courses = [] } = {} } = useGetCoursesQuery({
    active: false,
  });

  const { data: { data: tasks = [] } = {} } =
    tasksApi.useGetTasksByUserIdQuery();

  const navigate = useNavigate();

  const onCourseClick = (courseId: number) => {
    navigate(`/student/courses/${courseId}`);
  };
  const onTestClick = (
    variant: '"homework"' | '"test"',
    courseTitle: string
  ) => {
    localStorage.setItem('filterByType', variant);
    localStorage.setItem('selectedValue', variant);
    localStorage.setItem('searchValue', `"${courseTitle}"`);
    localStorage.setItem('filter', `"${courseTitle}"`);
    navigate(`/student/tasks`);
  };

  const categorizeTasks = (tasks: Task[]) => {
    const stats: StatsData = {};

    tasks.forEach(task => {
      const { taskType, courseTitle, status } = task;

      if (!stats[courseTitle]) {
        stats[courseTitle] = {
          homework: { null: 0, done: 0, check: 0 },
          test: { null: 0, done: 0, check: 0 },
        };
      }

      if (status === 'null') {
        stats[courseTitle][taskType].null += 1;
      } else if (status === 'done') {
        stats[courseTitle][taskType].done += 1;
      } else if (status === 'check') {
        stats[courseTitle][taskType].check += 1;
      }
    });

    return stats;
  };

  const stats = useMemo(() => categorizeTasks(tasks), [tasks]);

  const matches = useMediaQuery('(max-width:705px)');

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreSharpIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography>Statistic</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {courses.map((course, idx) => {
            const courseStats = stats[course.title] || {
              homework: { null: 0, done: 0, check: 0 },
              test: { null: 0, done: 0, check: 0 },
            };
            const { homework, test } = courseStats;
            const totalHomework =
              homework.null + homework.done + homework.check;
            const totalTests = test.null + test.done + test.check;

            return (
              <ListItem
                key={course.id}
                sx={{
                  paddingTop: 4,
                  paddingBottom: 4,
                  display: 'flex',
                  gap: matches ? 4 : 0,
                  justifyContent: 'space-around',
                  flexDirection: matches ? 'column' : 'row',
                  flexWrap: 'wrap',
                  transition: 'all 200ms',
                  borderBottom:
                    courses.length - 1 !== idx ? '0.2px solid #0000004a' : null,
                  ':hover': { backgroundColor: '#00000011' },
                }}
              >
                <Tooltip title={course.title + ' - ' + course.description}>
                  <Button onClick={() => onCourseClick(course.id)}>
                    <Card
                      sx={{
                        width: 150,
                        margin: 'auto',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: 150,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={
                          course.imgUrl
                            ? course.imgUrl
                            : 'https://i.ibb.co/60VL44W/Placeholder-1.png'
                        }
                        alt={course.title}
                      />
                    </Card>
                  </Button>
                </Tooltip>
                <Tooltip title={`${course.title} - tests progress`}>
                  <Button
                    onClick={() => onTestClick('"test"', course.title)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      color: 'black',
                      textDecoration: 'none',
                      textDecorationLine: 'none',
                      transition: 'all 200ms',
                      ':hover': { textDecoration: 'none', color: '#1565c0' },
                    }}
                  >
                    <Gauge
                      width={220}
                      height={140}
                      value={test.done + test.check}
                      valueMax={totalTests}
                      cornerRadius="50%"
                      startAngle={-110}
                      endAngle={110}
                      sx={theme => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 36,
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: 'primary',
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                          fill: theme.palette.text.disabled,
                        },
                      })}
                      text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    />
                    <Typography>Tests</Typography>
                  </Button>
                </Tooltip>

                <Tooltip title={`${course.title} - homeworks progress`}>
                  <Button
                    onClick={() => onTestClick('"homework"', course.title)}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                      color: 'black',
                      textDecoration: 'none',
                      textDecorationLine: 'none',
                      transition: 'all 200ms',
                      ':hover': {
                        textDecoration: 'none',
                        color: '#1565c0',
                      },
                    }}
                  >
                    <Gauge
                      width={220}
                      height={140}
                      value={homework.done + homework.check}
                      valueMax={totalHomework}
                      cornerRadius="50%"
                      startAngle={-110}
                      endAngle={110}
                      sx={theme => ({
                        [`& .${gaugeClasses.valueText}`]: {
                          fontSize: 36,
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                          fill: 'primary',
                        },
                        [`& .${gaugeClasses.referenceArc}`]: {
                          fill: theme.palette.text.disabled,
                        },
                      })}
                      text={({ value, valueMax }) => `${value} / ${valueMax}`}
                    />
                    <Typography>Homeworks</Typography>
                  </Button>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </AccordionDetails>
    </Accordion>
  );
};

export default Stats;
