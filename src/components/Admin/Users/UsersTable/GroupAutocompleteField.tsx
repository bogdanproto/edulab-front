import { useGetGroupsQuery } from '@/redux/groups';
import {
  Autocomplete,
  Chip,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material';
import { MRT_Row } from 'material-react-table';
import { FC, useEffect, useState } from 'react';
import { Group } from 'types/group.d';
import { Role } from 'types/role.d';
import { User } from 'types/user.d';

interface GroupAutocompleteFieldProps {
  row: MRT_Row<User>;
  currentRole: Role;
}

const GroupAutocompleteField: FC<GroupAutocompleteFieldProps> = ({
  row,
  currentRole,
}: GroupAutocompleteFieldProps) => {
  const { data: groupsData } = useGetGroupsQuery();
  const groups = groupsData?.data || [];

  const groupOptions: string[] = groups.map((group: Group) => group.name);

  const [groupNames, setGroupNames] = useState<string[]>(
    row._valuesCache['groupNames'] || []
  );

  useEffect(() => {
    if (currentRole === Role.STUDENT && groupNames.length > 1) {
      setGroupNames(groupNames.slice(0, 1));
    }
    row._valuesCache['groupNames'] = groupNames;
  }, [currentRole, groupNames, row._valuesCache]);

  const handleGroupChange = (
    _event: React.SyntheticEvent<Element, Event>,
    value: string[]
  ): void => {
    setGroupNames(value);
    row._valuesCache['groupNames'] = value;
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const selectedGroup = event.target.value;
    if (selectedGroup) {
      setGroupNames([selectedGroup]);
      row._valuesCache['groupNames'] = [selectedGroup];
    } else {
      setGroupNames([]);
      row._valuesCache['groupNames'] = [];
    }
  };

  if (currentRole === Role.ADMIN) return null;

  if (currentRole === Role.STUDENT) {
    return (
      <Select
        id="group-select"
        value={groupNames[0] || ''}
        onChange={handleSelectChange}
        displayEmpty
        variant="outlined"
        error={groupNames.length === 0}
        fullWidth
      >
        <MenuItem value="" disabled>
          Select Group
        </MenuItem>
        {groupOptions.map(option => (
          <MenuItem key={option} value={option} id="group-menu-item">
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  }

  return (
    <Autocomplete
      id="group-autocomplete"
      value={groupNames}
      multiple
      filterSelectedOptions
      disableClearable
      options={groupOptions}
      onChange={handleGroupChange}
      isOptionEqualToValue={(option, value) => option === value}
      getOptionLabel={option => option}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip
            id="group-chip"
            variant="outlined"
            label={option}
            {...getTagProps({ index })}
            key={option}
          />
        ))
      }
      renderInput={params => (
        <TextField
          {...params}
          label={'Group'}
          variant="outlined"
          error={groupNames.length === 0}
          helperText={groupNames.length === 0 && 'Group is required'}
        />
      )}
    />
  );
};

export default GroupAutocompleteField;
