import { Button } from '@mui/material';
import { Popconfirm } from 'components/core';

export default function AssignButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Popconfirm
      title="Confirmation"
      description="Assign courses to this group?"
      onConfirm={onConfirm}
    >
      <Button>Assign</Button>
    </Popconfirm>
  );
}
