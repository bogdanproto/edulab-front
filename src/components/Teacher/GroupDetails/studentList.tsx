import { useGetGroupStudentsQuery } from '@/redux/groups';
import { List } from '@mui/material';
import { StudentListItem } from 'components/Teacher/GroupDetails/studentListItem';
import { useParams } from 'react-router-dom';

export default function StudentList() {
  const { id } = useParams();
  const { data: students = { data: [] }, isLoading } = useGetGroupStudentsQuery(
    id!
  );

  return (
    <List component="ul">
      {!isLoading &&
        students &&
        students.data &&
        students.data.map(student => (
          <StudentListItem key={student.id} {...student} />
        ))}
    </List>
  );
}
