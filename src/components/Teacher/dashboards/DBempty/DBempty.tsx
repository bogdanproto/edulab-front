import InsertChartIcon from '@mui/icons-material/InsertChart';
import { Box, Paper, Typography } from '@mui/material';

export const DBempty = () => {
  return (
    <Paper>
      <Box
        p={1}
        height={352}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" color={'lightgray'}>
          no data to display chart
        </Typography>
        <InsertChartIcon sx={{ fontSize: 260, color: 'lightgray' }} />
      </Box>
    </Paper>
  );
};
