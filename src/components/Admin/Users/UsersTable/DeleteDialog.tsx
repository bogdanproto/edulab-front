/* eslint-disable jsx-a11y/no-autofocus */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DeleteDialogProps<T> {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  deletingItemName: T | null;
  isDeleting: boolean;
}

const DeleteDialog = <T extends React.ReactNode>({
  open,
  onClose,
  onDelete,
  isDeleting,
  deletingItemName,
}: DeleteDialogProps<T>) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete
          <br />
          {deletingItemName && (
            <span>
              <strong>{deletingItemName}</strong>?
            </span>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onDelete}
          autoFocus
          color="error"
          disabled={isDeleting}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
