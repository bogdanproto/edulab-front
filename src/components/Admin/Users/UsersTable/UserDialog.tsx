/* eslint-disable @typescript-eslint/no-explicit-any */
import { DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { MRT_EditActionButtons } from 'material-react-table';

interface DialogContentProps {
  title: string;
  internalEditComponents: React.ReactNode;
  table: any;
  row: any;
}

const UserDialog = ({
  title,
  internalEditComponents,
  table,
  row,
}: DialogContentProps) => {
  return (
    <>
      <DialogTitle variant="h4">{title}</DialogTitle>
      <DialogContent
        sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        {internalEditComponents}
      </DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
};

export default UserDialog;
