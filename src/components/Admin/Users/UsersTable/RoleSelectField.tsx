import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import { MRT_Row } from 'material-react-table';
import React, { FC, useEffect, useState } from 'react';
import { Role } from 'types/role.d';
import { User } from 'types/user.d';

interface RoleSelectFieldProps {
  value: Role;
  row: MRT_Row<User>;
  onRoleChange: (newRole: Role) => void;
}

const RoleSelectField: FC<RoleSelectFieldProps> = ({
  value,
  row,
  onRoleChange,
}) => {
  const [role, setRole] = useState<Role>(value || Role.STUDENT);

  useEffect(() => {
    row._valuesCache['role'] = role;
    onRoleChange(role);
  }, [role, row, onRoleChange]);

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value as Role;
    setRole(newRole);
    row._valuesCache['role'] = newRole;
    onRoleChange(newRole);
  };

  return (
    <FormControl component="fieldset">
      <RadioGroup id="role-select" value={role} onChange={handleRoleChange} row>
        <FormControlLabel
          value={Role.STUDENT}
          control={<Radio />}
          label="Student"
        />
        <FormControlLabel
          value={Role.TEACHER}
          control={<Radio />}
          label="Teacher"
        />
        <FormControlLabel
          value={Role.ADMIN}
          control={<Radio />}
          label="Admin"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default RoleSelectField;
