import { Box, Checkbox, Chip } from '@mui/material';
import GroupAutocompleteField from 'components/Admin/Users/UsersTable/GroupAutocompleteField';
import RoleSelectField from 'components/Admin/Users/UsersTable/RoleSelectField';
import { MRT_ColumnDef } from 'material-react-table';
import { useState } from 'react';
import { Role } from 'types/role.d';
import { User } from 'types/user';

import CheckboxField from './CheckboxField';

interface ColumnsProps {
  validationErrors: Record<string, string>;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  isCreating: boolean;
}

const ColumnsUsersTable = ({
  validationErrors,
  setValidationErrors,
  isCreating,
}: ColumnsProps): MRT_ColumnDef<User>[] => {
  const [currentRole, setCurrentRole] = useState<Role>(Role.STUDENT);

  const handleRoleChange = (newRole: Role) => {
    setCurrentRole(newRole);
  };

  return [
    {
      accessorKey: 'id',
      header: 'Id',
      enableEditing: false,
      size: 80,
      Edit: () => null,
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.firstName,
        helperText: validationErrors?.firstName,
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            firstName: validationErrors?.firstName || '',
          }),
      },
    },
    {
      accessorKey: 'lastName',
      header: 'Last name',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.lastName,
        helperText: validationErrors?.lastName,
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            lastName: validationErrors?.lastName || '',
          }),
      },
    },
    {
      accessorKey: 'email',
      header: 'Email',
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.email,
        helperText: validationErrors?.email,
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            email: validationErrors?.email || '',
          }),
      },
    },
    {
      accessorKey: 'role',
      header: 'Role',
      Edit: ({ row, cell }) =>
        isCreating ? (
          <RoleSelectField
            value={cell.getValue<Role>() || currentRole}
            row={row}
            onRoleChange={handleRoleChange}
          />
        ) : null,
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.role,
        helperText: validationErrors?.role,
        onFocus: () => {
          setValidationErrors({
            ...validationErrors,
            role: validationErrors?.role || '',
          });
        },
      },
    },
    {
      accessorKey: 'groupNames',
      header: 'Groups',
      size: 300,
      Edit: ({ row }) => (
        <GroupAutocompleteField
          row={row}
          currentRole={isCreating ? currentRole : row.original.role}
        />
      ),
      Cell: ({ cell }) => (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {cell.getValue<string[]>().map((groupName, index) => (
            <Chip key={index + groupName} label={groupName} />
          ))}
        </Box>
      ),
      muiEditTextFieldProps: {
        required: true,
        error: !!validationErrors?.groupNames,
        helperText: validationErrors?.groupNames,
        onFocus: () =>
          setValidationErrors({
            ...validationErrors,
            groupNames: validationErrors?.groupNames || '',
          }),
      },
    },
    {
      accessorKey: 'isActivated',
      header: 'Activated',
      Edit: ({ cell, row, column }) => (
        <CheckboxField
          value={isCreating ? false : cell.getValue<boolean>() === true}
          column={column}
          row={row}
        />
      ),
      Cell: ({ cell }) => (
        <Checkbox checked={cell.getValue<boolean>() === true} disabled />
      ),
    },
  ];
};

export default ColumnsUsersTable;
