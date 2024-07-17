import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

type Props = {
  count: number;
  total: number;
};

const TestProgress: FC<Props> = ({ count, total }) => {
  const progress = Math.round((100 * count) / total);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      <Box sx={{ minWidth: 55 }}>
        <Typography
          variant="body2"
          color="text.secondary"
        >{`${count} of ${total}`}</Typography>
      </Box>
    </Box>
  );
};

export default TestProgress;
