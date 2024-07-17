import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { FC, useEffect, useState } from 'react';

const CheckboxField: FC<{
  value: boolean;
  column: {
    id: string;
    columnDef: { header: string };
  };
  row: {
    _valuesCache: Record<string, boolean>;
  };
}> = ({ value, column, row }) => {
  const [checked, setChecked] = useState(value !== undefined ? value : false);

  useEffect(() => {
    if (value !== undefined) {
      setChecked(value);
      row._valuesCache[column.id] = value;
    }
  }, [value]);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setChecked(newChecked);
    row._valuesCache[column.id] = newChecked;
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          id="id-сheckbox"
          checked={checked}
          onChange={handleCheckboxChange}
          sx={{ display: 'inline-flex' }}
        />
      }
      label={column.columnDef.header}
    />
  );
};

export default CheckboxField;
