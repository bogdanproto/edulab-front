import { Box, TextField, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type HFInputProps = {
  name: string;
  label: string;
  error: string | undefined;
  multiline?: number | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};

export const HFInput: React.FC<HFInputProps> = ({
  name,
  label,
  multiline = null,
  error,
  control,
}) => {
  return (
    <Box width="100%">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label={label}
            fullWidth
            size="small"
            variant="outlined"
            multiline={multiline ? true : false}
            rows={multiline ? multiline : undefined}
          />
        )}
      />
      {error && (
        <Typography
          display="block"
          variant="caption"
          color="error"
          sx={{ position: 'absolute' }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};
