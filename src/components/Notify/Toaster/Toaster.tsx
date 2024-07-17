import { useTypeDispatch } from '@/hooks';
import { setMessage } from '@/redux/notifySlice';
import { Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import * as React from 'react';

import { typeMsg } from '@/types/redux';

export interface IPropsNotification {
  type: typeMsg;
  message: string;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

export const Toaster = ({ type, message }: IPropsNotification) => {
  const [open, setOpen] = React.useState(true);
  const dispatch = useTypeDispatch();

  const handleClose = () => {
    setOpen(false);
    dispatch(setMessage(null));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '320px' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
