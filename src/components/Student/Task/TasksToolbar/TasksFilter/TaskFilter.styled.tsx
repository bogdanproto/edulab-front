import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Input = styled(TextField)({
  width: '100%',
  '& .MuiOutlinedInput-root .MuiOutlinedInput-input::placeholder': {
    opacity: 1,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  '& .MuiOutlinedInput-root.MuiOutlinedInput-input': {
    color: 'rgba(0, 0, 0, 0.7)',
  },
  '& .MuiInputBase-root.MuiOutlinedInput-root': {
    paddingLeft: '8px',
  },
});

export const FilterWrapper = styled('div')({
  width: '100%',
  '@media (min-width: 360px)': {
    maxWidth: '470px',
  },
});
