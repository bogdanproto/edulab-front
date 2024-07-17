import { useAssignCourses } from '@/hooks/useAssignCourses';
import { Stack } from '@mui/material';
import AssignButton from 'components/Teacher/GroupDetails/assignButton';
import CourseSelector from 'components/Teacher/GroupDetails/courseSelect';

export default function AssignCourses() {
  const { selected, options, handleAssign, onChange, isLoading } =
    useAssignCourses();

  return (
    !isLoading && (
      <Stack direction={'row'}>
        <CourseSelector
          allCourses={options}
          assignedCourses={selected}
          onChange={onChange}
        />
        <AssignButton onConfirm={handleAssign} />
      </Stack>
    )
  );
}
