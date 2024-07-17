import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import React from 'react';

interface ItemsPerPageSelectProps {
  value: number;
  onChange: (event: SelectChangeEvent<number>) => void;
  itemsPerPageOptions: { value: number; label: string }[];
}

const ItemsPerPageSelect: React.FC<ItemsPerPageSelectProps> = ({
  value,
  onChange,
  itemsPerPageOptions,
}) => {
  if (!itemsPerPageOptions) {
    return null;
  }

  return (
    <Select value={value} onChange={onChange} variant="outlined" size="small">
      {itemsPerPageOptions?.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default ItemsPerPageSelect;
