import {
  useGetGroupsQuery,
  useAddGroupMutation,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} from '@/redux/groups';
import groupSchema from '@/validators/schemaGroup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import AdminTabsHeader from 'components/Admin/AdminTabsHeader';
import DeleteDialog from 'components/Admin/Users/UsersTable/DeleteDialog';
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_TableOptions,
  type MRT_RowVirtualizer,
  MRT_SortingState,
} from 'material-react-table';
import { useEffect, useRef, useState } from 'react';
import { Group } from 'types/group';
import { ValidationError } from 'yup';

import columns from './columns';

const GroupsTable = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

  const { data: groups = [], isLoading, isError, error } = useGetGroupsQuery();
  const [addGroup, { isLoading: isAddingGroup }] = useAddGroupMutation();
  const [updateGroup, { isLoading: isUpdatingGroup }] =
    useUpdateGroupMutation();
  const [deleteGroup, { isLoading: isDeletingGroup }] =
    useDeleteGroupMutation();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deletingGroup, setDeletingGroup] = useState<Group | null>(null);
  const [showAlertBanner, setShowAlertBanner] = useState(false);
  const [sorting, setSorting] = useState<MRT_SortingState>([]);

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

  const validateGroup = async (
    group: Group
  ): Promise<Record<string, string>> => {
    try {
      await groupSchema.validate(group, { abortEarly: false });

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

  const handleCreateGroup: MRT_TableOptions<Group>['onCreatingRowSave'] =
    async ({ values, table }) => {
      const newValidationErrors = await validateGroup(values);
      if (Object.keys(newValidationErrors).length > 0) {
        setValidationErrors(newValidationErrors);

        return;
      }
      setValidationErrors({});
      await addGroup({ name: values.name });
      table.setCreatingRow(null);
    };

  const handleSaveGroup: MRT_TableOptions<Group>['onEditingRowSave'] = async ({
    values,
    table,
  }) => {
    const newValidationErrors = await validateGroup(values);
    if (Object.keys(newValidationErrors).length > 0) {
      setValidationErrors(newValidationErrors);

      return;
    }
    setValidationErrors({});
    await updateGroup(values);
    table.setEditingRow(null);
  };

  const handleDeleteGroup = async () => {
    if (deletingGroup) {
      await deleteGroup(`${deletingGroup.id}`);
      setOpenDeleteModal(false);
      setDeletingGroup(null);
    }
  };

  const table = useMaterialReactTable({
    muiTableContainerProps: {
      sx: {
        minHeight: '300px',
        maxHeight: 'calc(100vh - 300px)',
      },
    },
    columns: columns({ validationErrors, setValidationErrors }),
    data: groups && 'data' in groups ? groups.data : [],
    createDisplayMode: 'row',
    editDisplayMode: 'row',
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
    onCreatingRowSave: handleCreateGroup,
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: handleSaveGroup,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            color="error"
            onClick={() => {
              setDeletingGroup(row.original);
              setOpenDeleteModal(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    renderTopToolbarCustomActions: ({ table }) => (
      <Button variant="contained" onClick={() => table.setCreatingRow(true)}>
        Create New Group
      </Button>
    ),
    initialState: {
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    state: {
      isLoading,
      sorting,
      isSaving: isAddingGroup || isUpdatingGroup || isDeletingGroup,
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
      <Stack spacing={3}>
        <AdminTabsHeader title="Groups" showBackBtn={false} />
        <MaterialReactTable table={table} />
      </Stack>
      <DeleteDialog
        open={openDeleteModal}
        onClose={() => {
          setOpenDeleteModal(false);
          setDeletingGroup(null);
        }}
        onDelete={handleDeleteGroup}
        deletingItemName={`${deletingGroup?.name}`}
        isDeleting={isDeletingGroup}
      />
    </>
  );
};

export default GroupsTable;
