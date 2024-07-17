import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React, { FC, useState } from 'react';

type Props = {
  title: string;
  description: string;
  onConfirm: () => void;
  okText?: string;
  cancelText?: string;
  children: React.ReactNode;
};

export const Popconfirm: FC<Props> = ({
  children,
  title,
  description,
  onConfirm,
  okText = 'Ok',
  cancelText = 'Cancel',
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOk = () => {
    onConfirm();
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modifiedChildren = React.Children.map(children, child =>
    React.cloneElement(child as React.ReactElement, {
      onClick: handleClickOpen,
    })
  );

  return (
    <>
      {modifiedChildren}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOk} variant="contained">
            {okText}
          </Button>
          <Button onClick={handleClose} variant="contained">
            {cancelText}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
