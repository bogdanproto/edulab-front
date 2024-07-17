import { Box, Grid } from '@mui/material';
import React from 'react';

type ListCardProps = {
  children: React.ReactElement | React.ReactElement[];
};

export const ListCard: React.FC<ListCardProps> = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {children}
      </Grid>
    </Box>
  );
};
