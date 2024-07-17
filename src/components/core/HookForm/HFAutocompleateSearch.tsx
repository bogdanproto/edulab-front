import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

export type IAutocomplete = {
  id: number;
  title: string;
};

export type HFAutocompleateProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  multiple?: boolean;
  name: string;
  label: string;
  options: IAutocomplete[];
  defaultValue?: IAutocomplete;
};

export const HFAutocompleateSearch = ({
  control,
  name,
  label,
  options,
}: HFAutocompleateProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Box width="100%">
            <Autocomplete
              value={
                options.find(option => option.id === field.value?.id) || null
              }
              onChange={(_, newValue: IAutocomplete | null) => {
                field.onChange(newValue);
              }}
              id="title"
              options={options}
              getOptionLabel={(option: IAutocomplete) => option.title}
              renderInput={params => <TextField {...params} label={label} />}
              size="small"
            />
            {error && (
              <Typography
                display="block"
                variant="caption"
                color="error"
                sx={{ position: 'absolute' }}
              >
                {error?.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};
