import { Grid } from '@mui/material';

type CardAdaptedProps = {
  children: React.ReactElement;
};

export const CardAdapted: React.FC<CardAdaptedProps> = ({ children }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      {children}
    </Grid>
  );
};
