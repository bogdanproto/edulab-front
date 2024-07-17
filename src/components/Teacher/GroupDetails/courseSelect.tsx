import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import {
  Autocomplete,
  Checkbox,
  Chip,
  ListItem,
  TextField,
} from '@mui/material';
import { Course } from 'types/course';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type CourseSelectorProps = {
  allCourses: Course[];
  assignedCourses: Course[];
  onChange: (e: unknown, newVal: Course[]) => void;
};

export default function CourseSelector({
  allCourses,
  assignedCourses,
  onChange,
}: CourseSelectorProps) {
  return (
    <Autocomplete
      options={allCourses}
      getOptionLabel={option => option.title}
      value={assignedCourses}
      multiple
      limitTags={2}
      disableCloseOnSelect
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderOption={(props, option, { selected }) => (
        <ListItem {...props} key={option.id}>
          <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
          {option.title}
        </ListItem>
      )}
      renderInput={params => (
        <TextField {...params} variant="standard" label="Assigned courses" />
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => {
          const { key, ...props } = getTagProps({ index });

          return <Chip key={key} label={option.title} {...props} />;
        })
      }
      sx={{ width: '350px' }}
    />
  );
}
