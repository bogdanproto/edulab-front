import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Modal as MuiModal } from '@mui/material';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  isOpenModal: boolean;
  setOpenModal: (value: boolean) => void;
  padding?: number;
};

export const Modal: FC<Props> = ({
  children,
  isOpenModal,
  setOpenModal,
  padding = 4,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'white',
    border: '1px solid gray',
    borderRadius: '10px',
    boxShadow: 24,
    p: padding,
    overflow: 'hidden',
  };

  return (
    <MuiModal
      open={isOpenModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={() => setOpenModal(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Box>
    </MuiModal>
  );
};
