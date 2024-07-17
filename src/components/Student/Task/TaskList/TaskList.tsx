import { toUpperCaseFirstChar } from '@/utils';
import AssignmentIcon from '@mui/icons-material/Assignment';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import { Task } from 'types/task';

import {
  GradeStatus,
  TaskContainer,
  TaskContent,
  TaskDescWrapper,
  TaskIcon,
  TaskLink,
  TaskType,
  InfoWrapper,
  CourseTitle,
  LessonTitle,
} from './TaskList.styled';

type TaskListProps = {
  tasks: Array<Task>;
};

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
    <TaskContainer>
      {tasks.map(task => (
        <TaskLink key={task.id} to={task.id.toString()} type={task.taskType}>
          <TaskDescWrapper>
            {task.taskType === 'homework' ? (
              <TaskIcon as={AssignmentIcon} type={task.taskType} />
            ) : (
              <TaskIcon as={FactCheckIcon} type={task.taskType} />
            )}
            <TaskContent>
              <TaskType>{toUpperCaseFirstChar(task.taskType)}</TaskType>
              <InfoWrapper>
                <CourseTitle
                  type={task.taskType}
                >{`${task.courseTitle} /`}</CourseTitle>
                <LessonTitle type={task.taskType}>
                  {task.lessonTitle}
                </LessonTitle>
              </InfoWrapper>
            </TaskContent>
          </TaskDescWrapper>
          {task.status === 'check' && (
            <GradeStatus type={task.taskType}>grade: {task.grade}</GradeStatus>
          )}
          {task.status === 'done' && (
            <GradeStatus type={task.taskType}>unchecked</GradeStatus>
          )}
          {task.status === 'null' && (
            <GradeStatus type={task.taskType}>uncompleted</GradeStatus>
          )}
        </TaskLink>
      ))}
    </TaskContainer>
  );
};

export default TaskList;
