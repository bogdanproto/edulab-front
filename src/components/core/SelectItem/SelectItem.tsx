import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { ItemSelect } from 'types/dashboard';

type SelectItemProps = {
  label: string;
  onChangeSelect: (id: number | null) => void;
  options: ItemSelect[];
};

export const SelectItem: React.FC<SelectItemProps> = ({
  onChangeSelect,
  options,
  label,
}) => {
  const [item, setItem] = useState<ItemSelect | undefined>(options[0]);
  const [inputValueItem, setInputValueItem] = useState('');

  useEffect(() => {
    if (item) {
      onChangeSelect(item.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ width: '100%' }} p={2}>
      <Stack direction="row" spacing={1}>
        <Autocomplete
          disableClearable
          value={item}
          onChange={(_, newValue: ItemSelect | undefined) => {
            setItem(newValue);
            onChangeSelect(newValue ? newValue.id : null);
          }}
          inputValue={inputValueItem}
          onInputChange={(_, newInputValue) => {
            setInputValueItem(newInputValue);
          }}
          id="item"
          options={options}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderInput={params => <TextField {...params} label={label} />}
          size="small"
          sx={{ width: '100%' }}
        />
      </Stack>
    </Box>
  );
};
