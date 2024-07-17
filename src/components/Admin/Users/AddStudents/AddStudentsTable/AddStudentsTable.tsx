import useUserValidation from '@/hooks/useUserValidation';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Autocomplete,
  Box,
  Button,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { VisuallyHiddenInput } from 'components/core';
import {
  MaterialReactTable,
  MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from 'material-react-table';
import { useEffect, useState } from 'react';
import { StudentToRegister } from 'types/user';

type AddStudentsTableProps = {
  students: StudentToRegister[];
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isFileUploading: boolean;
  fileTypeError: string | null;
  onSubmit: (students: StudentToRegister[]) => void;
  groupOptions: string[];
  isLoading: boolean;
  isError: boolean;
};

const AddStudentsTable = ({
  students,
  handleFileUpload,
  isFileUploading,
  fileTypeError,
  onSubmit,
  groupOptions,
  isLoading,
  isError,
}: AddStudentsTableProps) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [users, setUsers] = useState<StudentToRegister[]>([]);
  const { validateRequired, validateEmail, validateUser } = useUserValidation();

  useEffect(() => {
    setUsers(prevUsers => [...prevUsers, ...students]);
  }, [students]);

  const handleUserChange = (
    newValue: string | null,
    id: string | number,
    field: keyof StudentToRegister
  ) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return;

    setUsers(prevUsers => {
      const updatedUsers = [...prevUsers];
      updatedUsers[userIndex] = {
        ...updatedUsers[userIndex],
        [field]: newValue?.trim(),
      };

      return updatedUsers;
    });
  };

  const columns: MRT_ColumnDef<StudentToRegister>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
      enableEditing: false,
      size: 80,
    },
    {
      accessorKey: 'firstName',
      header: 'First Name',
      muiEditTextFieldProps: ({ cell, row }) => ({
        type: 'text',
        required: true,
        error: !!validationErrors?.[cell.id],
        helperText: validationErrors?.[cell.id],
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
          const value = event.target.value;

          const validationError = !validateRequired(value)
            ? 'Required'
            : undefined;
          setValidationErrors({
            ...validationErrors,
            [cell.id]: validationError,
          });
          handleUserChange(value, row.id, 'firstName');
        },
      }),
    },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      muiEditTextFieldProps: ({ cell, row }) => ({
        type: 'text',
        required: true,
        error: !!validationErrors?.[cell.id],
        helperText: validationErrors?.[cell.id],
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
          const value = event.target.value;

          const validationError = !validateRequired(value)
            ? 'Required'
            : undefined;
          setValidationErrors({
            ...validationErrors,
            [cell.id]: validationError,
          });

          handleUserChange(value, row.id, 'lastName');
        },
      }),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      muiEditTextFieldProps: ({ cell, row }) => ({
        type: 'email',
        required: true,
        error: !!validationErrors?.[cell.id],
        helperText: validationErrors?.[cell.id],
        onBlur: (event: React.FocusEvent<HTMLInputElement>) => {
          const value = event.target.value;

          const validationError = !validateEmail(value)
            ? 'Incorrect Email Format'
            : undefined;
          setValidationErrors({
            ...validationErrors,
            [cell.id]: validationError,
          });

          handleUserChange(value, row.id, 'email');
        },
      }),
    },

    {
      accessorKey: 'groupName',
      header: 'Group Name',
      Cell: ({ cell, row }) => {
        const userIndex = users.findIndex(user => user.id === row.id);

        return (
          <Autocomplete
            options={groupOptions}
            value={
              users[userIndex].groupName ? users[userIndex].groupName : null
            }
            onChange={(_, value) => {
              const validationError = !validateRequired(value)
                ? 'Required'
                : undefined;
              setValidationErrors({
                ...validationErrors,
                [cell.id]: validationError,
              });

              handleUserChange(value, row.id, 'groupName');
            }}
            renderInput={params => (
              <TextField
                {...params}
                required={true}
                placeholder="Group"
                disabled={groupOptions.length === 0}
                variant="standard"
                error={!!validationErrors?.[cell.id]}
                helperText={validationErrors?.[cell.id]}
              />
            )}
          />
        );
      },
      Edit: ({ cell, row }) => {
        return (
          <Autocomplete
            options={groupOptions}
            onChange={(_, value) => {
              const validationError = !validateRequired(value)
                ? 'Required'
                : undefined;
              setValidationErrors({
                ...validationErrors,
                [cell.id]: validationError,
              });

              row._valuesCache['groupName'] = value || '';
            }}
            renderInput={params => (
              <TextField
                {...params}
                placeholder="Group"
                variant="standard"
                error={!!validationErrors?.[cell.id]}
                helperText={validationErrors?.[cell.id]}
              />
            )}
          />
        );
      },
    },
  ];

  const handleCreateUser: MRT_TableOptions<StudentToRegister>['onCreatingRowSave'] =
    ({ values, table }) => {
      const newValidationErrors = validateUser(values);
      if (Object.values(newValidationErrors).some(error => error)) {
        setValidationErrors(newValidationErrors);

        return;
      }

      setValidationErrors({});

      const newUserWithId = {
        ...values,
        id: (Math.random() + 1).toString(36).substring(7),
      };

      setUsers(prevUsers => [...prevUsers, newUserWithId]);

      table.setCreatingRow(null);
    };

  const handleDelete = (row: MRT_Row<StudentToRegister>) => {
    setUsers(prevUsers => {
      const updatedUsers = prevUsers.filter(
        user => user.id !== row.original.id
      );

      const updatedValidationErrors = { ...validationErrors };
      Object.keys(updatedValidationErrors).forEach(key => {
        if (key.startsWith(`${row.original.id}_`)) {
          delete updatedValidationErrors[key];
        }
      });

      setValidationErrors(updatedValidationErrors);

      return updatedUsers;
    });
  };

  const handleSubmitUsers = async () => {
    if (Object.values(validationErrors).some(error => !!error)) return;

    onSubmit(users);
    setUsers([]);
  };

  const table = useMaterialReactTable({
    columns,
    data: users,
    createDisplayMode: 'row',
    editDisplayMode: 'cell',
    enableCellActions: true,
    enableClickToCopy: 'context-menu',
    enableColumnPinning: true,
    enableEditing: true,
    enableRowActions: true,
    getRowId: row => row?.id?.toString(),
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'An error occured, please try again later',
        }
      : undefined,
    muiTableContainerProps: {
      sx: {
        minHeight: '400px',
        maxHeight: 'calc(100vh - 300px)',
      },
    },
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderBottomToolbarCustomActions: () => (
      <Box sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Button
          color="success"
          variant="contained"
          onClick={handleSubmitUsers}
          disabled={
            users.length === 0 ||
            Object.values(validationErrors).some(error => !!error) ||
            users.some(
              user =>
                !user.firstName ||
                !user.lastName ||
                !user.email ||
                !user.groupName ||
                !user.id
            ) ||
            Object.values(validationErrors).some(error => !!error)
          }
        >
          Submit
        </Button>

        {users.some(
          user =>
            !user.firstName || !user.lastName || !user.email || !user.groupName
        ) && (
          <Typography color="error">
            Please fill in all required fields
          </Typography>
        )}

        {Object.values(validationErrors).some(error => !!error) && (
          <Typography color="error">Fix errors before submitting</Typography>
        )}
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
        <Button
          variant="contained"
          onClick={() => {
            table.setCreatingRow(true);
          }}
        >
          Create New User
        </Button>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Tooltip title="Please upload an Excel file with columns: First Name, Last Name, Email, Group Name">
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleFileUpload} />
            </Button>
          </Tooltip>

          {fileTypeError && (
            <Typography
              color="error"
              variant="caption"
              display="block"
              gutterBottom
            >
              {fileTypeError}
            </Typography>
          )}
        </div>
      </div>
    ),
    initialState: {
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    state: {
      showAlertBanner: isError,
      showProgressBars: isFileUploading || isLoading,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default AddStudentsTable;
