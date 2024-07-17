import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import GlobalStyles from '@mui/material/GlobalStyles';
import { MainNav } from 'components/layout/MainNav';
import { SideNav } from 'components/layout/SideNav';
import { Loader } from 'components/Notify/Loader/Loader';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { NotifyManager } from '@/components/Notify';

export default function Layout(): React.JSX.Element {
  return (
    <>
      <GlobalStyles
        styles={{
          body: {},
        }}
      />
      <NotifyManager />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          minHeight: '100%',
          width: '100%',
        }}
      >
        <SideNav />
        <Box
          sx={{
            display: 'flex',
            flex: '1 1 auto',
            flexDirection: 'column',
            pl: { lg: '280px' },
          }}
        >
          <MainNav />
          <main>
            <Container maxWidth="xl" sx={{ py: '32px' }}>
              <React.Suspense fallback={<Loader />}>
                <Outlet />
              </React.Suspense>
            </Container>
          </main>
        </Box>
      </Box>
    </>
  );
}
