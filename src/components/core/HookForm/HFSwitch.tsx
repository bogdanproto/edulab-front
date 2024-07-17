import { FormControlLabel, Switch, Typography } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

type HFSwitchProps = {
  name: string;
  label: string;
  error: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
};

export const HFSwitch: React.FC<HFSwitchProps> = ({
  name,
  label,
  error,
  control,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch {...field} checked={field.value} size="medium" />}
            label={label}
            labelPlacement="start"
            sx={{ marginRight: '0px' }}
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
    </>
  );
};
