import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { ItemSelect, GroupSelect } from 'types/dashboard';

type SelectGroupCourseProps = {
  onGroupChange: (groupId: number | null) => void;
  onCourseChange: (courseId: number | null) => void;
  optionsSelect: GroupSelect[];
};

export const SelectGroupCourse: React.FC<SelectGroupCourseProps> = ({
  onGroupChange,
  onCourseChange,
  optionsSelect,
}) => {
  const [group, setGroup] = useState<GroupSelect | undefined>(optionsSelect[0]);
  const [inputValueGroup, setInputValueGroup] = useState('');

  const [course, setCourse] = useState<ItemSelect | null>(
    optionsSelect[0].courses[0]
  );
  const [inputValueCourse, setInputValueCourse] = useState('');

  useEffect(() => {
    if (group) {
      onGroupChange(group.id);
    }
    if (course) {
      onCourseChange(course.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: '100%' }} p={2}>
      <Stack direction="row" spacing={1}>
        <Autocomplete
          disableClearable
          value={group}
          onChange={(_, newValue: GroupSelect | undefined) => {
            setGroup(newValue);
            setCourse(newValue?.courses[0] || null);
            onGroupChange(newValue ? newValue.id : null);
            onCourseChange(newValue ? newValue.courses[0].id : null);
          }}
          inputValue={inputValueGroup}
          onInputChange={(_, newInputValue) => {
            setInputValueGroup(newInputValue);
          }}
          id="group"
          options={optionsSelect}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderInput={params => <TextField {...params} label="Group" />}
          size="small"
          sx={{ width: '100%' }}
        />

        <Autocomplete
          disableClearable
          value={course}
          onChange={(_, newValue: ItemSelect | null) => {
            setCourse(newValue);
            onCourseChange(newValue ? newValue.id : null);
          }}
          inputValue={inputValueCourse}
          onInputChange={(_, newInputValue) => {
            setInputValueCourse(newInputValue);
          }}
          id="course"
          options={group?.courses || []}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          renderInput={params => <TextField {...params} label="Course" />}
          size="small"
          sx={{ width: '100%' }}
        />
      </Stack>
    </Box>
  );
};
