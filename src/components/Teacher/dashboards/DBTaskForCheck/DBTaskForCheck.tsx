import { Box, Paper, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { DBTaskForCheckType } from 'types/dashboard';

type DBTaskForCheckProps = {
  data: DBTaskForCheckType | undefined;
};

export const DBTaskForCheck: React.FC<DBTaskForCheckProps> = ({ data }) => {
  return (
    <Paper elevation={2}>
      <Box
        p={6}
        height={352}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Gauge
          value={data && data.taskcount}
          startAngle={-90}
          endAngle={90}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 48,
              transform: 'translate(0px, -24px)',
            },
          }}
        />
        <Typography variant="button" sx={{ height: '44px' }}>
          Tasks for checking
        </Typography>
      </Box>
    </Paper>
  );
};
