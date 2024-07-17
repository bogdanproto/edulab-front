import Stack from '@mui/material/Stack';
import UsersListTable from 'components/Admin/Users/UsersTable/UsersTable';
import React from 'react';

import AdminTabsHeader from '../AdminTabsHeader';

export default function Users(): React.JSX.Element {
  return (
    <Stack spacing={3}>
      <AdminTabsHeader title="Users" showBackBtn={false} />
      <UsersListTable />
    </Stack>
  );
}
