import { useGetCoursesQuery } from '@/redux/courses/coursesApi';
import { toFilterByString } from '@/utils';
import { List } from '@mui/material';
import { BreadCrumbsRouter } from 'components/core';
import { ItemCoursTeacher, ToolsBarTeacher } from 'components/Teacher';
import { useState } from 'react';

const CoursesTeacherPage = () => {
  const [filter, setFilter] = useState<string>('');
  const { data } = useGetCoursesQuery({ active: false });

  const filteredData = toFilterByString(data?.data || [], filter).sort(
    (a, b) => Number(b.isActive) - Number(a.isActive)
  );

  return (
    <>
      <BreadCrumbsRouter />
      <ToolsBarTeacher handleSearch={setFilter} />
      {data && (
        <List>
          {filteredData.length > 0
            ? filteredData.map(course => (
                <ItemCoursTeacher key={course.id} course={course} />
              ))
            : 'There are no courses for this request'}
        </List>
      )}
    </>
  );
};

export default CoursesTeacherPage;
