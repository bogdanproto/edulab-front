import { usePopover } from '@/hooks/usePopover';
import { SvgIconComponent } from '@mui/icons-material';
import { Box } from '@mui/material';
import React from 'react';

export type PopoverComponentProps = {
  anchorEl: Element | null;
  onClose: () => void;
  open: boolean;
};

type PopoverComponent = React.ComponentType<PopoverComponentProps>;

type Props = {
  Icon: SvgIconComponent;
  titleAccess: string;
  Popover: PopoverComponent;
};

export default function IconWithPopover({ Icon, titleAccess, Popover }: Props) {
  const { handleOpen, anchorRef, handleClose, open } = usePopover();

  return (
    <>
      <Box onClick={handleOpen} ref={anchorRef}>
        <Icon color="primary" titleAccess={titleAccess} />
      </Box>
      <Popover anchorEl={anchorRef.current} onClose={handleClose} open={open} />
    </>
  );
}
