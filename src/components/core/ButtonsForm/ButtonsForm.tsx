import { Box, Button } from '@mui/material';
import React from 'react';

import { Popconfirm } from '../Popconfirm/Popconfirm';
type ButtonsFormProps = {
  submitBtn: string;
  additionalBtn?: {
    title: string;
    textConfirm: string;
    callBack: () => void;
  } | null;

  disabled?: boolean;
};

export const ButtonsForm: React.FC<ButtonsFormProps> = ({
  submitBtn,
  additionalBtn,
  disabled = false,
}) => {
  return (
    <Box
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      gap={2}
      mt={2}
    >
      {additionalBtn && (
        <Popconfirm
          title={`Delete the ${additionalBtn.textConfirm}`}
          description={`Are you sure to delete ${additionalBtn.textConfirm}`}
          onConfirm={additionalBtn.callBack}
        >
          <Button
            type="button"
            variant="contained"
            sx={{ width: { xs: '100%', sm: 'initial' } }}
          >
            {additionalBtn.title}
          </Button>
        </Popconfirm>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={disabled}
        sx={{ width: { xs: '100%', sm: 'initial' } }}
      >
        {submitBtn}
      </Button>
    </Box>
  );
};
