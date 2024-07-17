import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';

export const Loader = () => {
  return (
    <Stack
      sx={{
        width: '100%',
        height: '4px',
        position: 'fixed',
        zIndex: 10000,
        top: 0,
        left: 0,
      }}
    >
      <LinearProgress color="primary" sx={{ height: '4px' }} />
    </Stack>
  );
};
