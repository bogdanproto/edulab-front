import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import { Button, ButtonProps } from '@mui/material';
import React, { ReactNode } from 'react';

interface CustomButtonProps extends ButtonProps {
  children: ReactNode;
  maxWidth: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  maxWidth,
  ...props
}) => {
  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      sx={{
        gap: 2,
        maxWidth: { maxWidth } || '35%',
        width: '100%',
        fontSize: {
          xs: '0.7rem',
          sm: '0.75rem',
        },
      }}
      fullWidth
      {...props}
    >
      {children}
      <ArrowForwardSharpIcon
        sx={{
          fontSize: {
            xs: '1rem',
            sm: '1.25rem',
          },
        }}
      />
    </Button>
  );
};

export default CustomButton;
