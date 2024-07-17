import useWindowDimensions from '@/hooks/useWindowDimensions';
import {
  useGetUsersQuery,
  useAddUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '@/redux/users/usersApi';
import userSchema from '@/validators/schemaUser';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';
import DeleteDialog from 'components/Admin/Users/UsersTable/DeleteDialog';
import UserDialog from 'components/Admin/Users/UsersTable/UserDialog';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_TableOptions,
  type MRT_RowVirtualizer,
  MRT_SortingState,
} from 'material-react-table';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Role } from 'types/role.d';
import { User } from 'types/user';
import { ValidationError } from 'yup';

import ColumnsUsersTable from './ColumnsUsersTable';

const UsersListTable = () => {
  const { height } = useWindowDimensions();
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});
  const [isCreating, setIsCreating] = useState(false);

  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const { data: users = [], isLoading, isError, error } = useGetUsersQuery();
  const [addUser, { isLoading: isAddingUser }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [showAlertBanner, setShowAlertBanner] = useState(false);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const navigate = useNavigate();

  useEffect(() => {
    //scroll to the top of the table when the sorting changes
    try {
      rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    } catch (error) {
      console.error(error);
    }
  }, [sorting]);

  useEffect(() => {
    if (isError) {
      setShowAlertBanner(true);

      const timeoutId = setTimeout(() => {
        setShowAlertBanner(false);
      }, 10000);

      return () => clearTimeout(timeoutId);
    }
  }, [isError]);

  const validateUser = async (user: User): Promise<Record<string, string>> => {
    try {
      await userSchema.validate(user, { abortEarly: false });

      if (
        user.role === Role.STUDENT &&
        (!user.groupNames || user.groupNames.length === 0)
      ) {
        return { groupNames: 'At least one group is required for students' };
      }

      if (
        user.role === Role.TEACHER &&
        (!user.groupNames || user.groupNames.length === 0)
      ) {
        return { groupNames: 'At least one group is required for teachers' };
      }

      return {};
    } catch (err) {
      if (err instanceof ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach(error => {
          if (error.path) errors[error.path] = error.message;
        });

        return errors;
      }
      throw err;
    }
  };

  const handleCreateUser: MRT_TableOptions<User>['onCreatingRowSave'] = async ({
    values,
    table,
  }) => {
    setIsCreating(true);
    if (!values.role) {
      values.role = Role.STUDENT;
    }
    const newValidationErrors = await validateUser(values);
    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);

      return;
    }
    setValidationErrors({});
    for (const key in values) {
      if (values[key] === '') {
        values[key] = null;
      }
    }
    if (values.role === Role.ADMIN) {
      delete values.groupNames;
    }

    await addUser(values);
    table.setCreatingRow(null);
    setIsCreating(false);
  };

  const handleSaveUser: MRT_TableOptions<User>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    if (!values.role) {
      values.role = Role.STUDENT;
    }
    const newValidationErrors = await validateUser(values);
    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);

      return;
    }
    setValidationErrors({});
    for (const key in values) {
      if (values[key] === '') {
        values[key] = null;
      }
    }
    await updateUser(values);
    table.setEditingRow(null);
  };

  const handleDeleteUser = async () => {
    if (deletingUser) {
      await deleteUser(+deletingUser.id);
      setOpenDeleteModal(false);
      setDeletingUser(null);
    }
  };

  const handleCancel = () => {
    setValidationErrors({});
    setIsCreating(false);
  };

  const table = useMaterialReactTable({
    muiTableContainerProps: {
      sx: {
        minHeight: '300px',
        maxHeight: `calc(${height}px - 300px)`,
      },
    },
    columns: ColumnsUsersTable({
      validationErrors,
      setValidationErrors,
      isCreating,
    }),
    data: users && 'data' in users ? users.data : [],
    createDisplayMode: 'modal',
    editDisplayMode: 'modal',
    enableEditing: true,
    defaultDisplayColumn: { enableResizing: true },
    enableBottomToolbar: false,
    positionActionsColumn: 'last',
    enableRowActions: true,
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Actions',
        size: 120,
      },
    },
    enableColumnResizing: true,
    enableColumnVirtualization: true,
    enableGlobalFilterModes: true,
    enablePagination: false,
    enableColumnPinning: true,
    enableRowNumbers: false,
    enableRowVirtualization: true,
    rowVirtualizerInstanceRef,
    rowVirtualizerOptions: { overscan: 5 },
    columnVirtualizerOptions: { overscan: 2 },
    onSortingChange: setSorting,
    getRowId: row => row?.id?.toString(),
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: handleCreateUser,
    onEditingRowCancel: () => handleCancel,
    onEditingRowSave: handleSaveUser,
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) =>
      UserDialog({
        title: 'Create new user',
        internalEditComponents,
        table,
        row,
      }),
    renderEditRowDialogContent: ({ table, row, internalEditComponents }) =>
      UserDialog({
        title: 'Edit user',
        internalEditComponents,
        table,
        row,
      }),
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton
            onClick={() => {
              setIsCreating(false);
              table.setEditingRow(row);
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              setDeletingUser(row.original);
              setOpenDeleteModal(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        <Button
          sx={{
            pl: { xs: '6px', sm: '16px' },
            pr: { xs: 0, sm: '16px' },
            minWidth: 40,
            lineHeight: { xs: '1.3', sm: '1.75' },
          }}
          variant="contained"
          onClick={() => {
            setIsCreating(true);
            table.setCreatingRow(true);
          }}
          startIcon={
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <PersonAddIcon />
            </Box>
          }
        >
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            Create New User
          </Box>
        </Button>
        <Button
          sx={{
            pl: { xs: '6px', sm: '16px' },
            pr: { xs: 0, sm: '16px' },
            minWidth: 40,
            lineHeight: { xs: '1.3', sm: '1.75' },
          }}
          variant="contained"
          onClick={() => navigate('add-students')}
          startIcon={
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <GroupAddIcon />
            </Box>
          }
        >
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            Add multiple students
          </Box>
        </Button>
      </div>
    ),
    state: {
      isLoading,
      sorting,
      isSaving: isAddingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: showAlertBanner,
      showProgressBars: isLoading,
    },
    muiToolbarAlertBannerProps: {
      color: 'error',
      children: isError ? (
        <Typography variant="body2" component="span">
          Error: {JSON.stringify('error' in error ? error.error : '')}
        </Typography>
      ) : null,
    },
  });

  return (
    <>
      <MaterialReactTable table={table} />
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setDeletingUser(null);
        }}
        onDelete={handleDeleteUser}
        deletingItemName={`${deletingUser?.firstName} ${deletingUser?.lastName}`}
        isDeleting={isDeletingUser}
      />
    </>
  );
};

export default UsersListTable;
