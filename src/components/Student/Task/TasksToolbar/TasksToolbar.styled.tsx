import {
  RadioGroup as RadioGroupHolder,
  FormControlLabel,
} from '@mui/material';
import { styled as styledMui } from '@mui/material/styles';

export const ToolBarWrapper = styledMui('div')(({ theme }) => ({
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1.6),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.2),
}));

export const AuxiliaryWrapper = styledMui('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  userSelect: 'none',

  '@media (min-width: 900px)': {
    flexDirection: 'row',
  },
}));

export const RadioGroup = styledMui(RadioGroupHolder)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  paddingLeft: theme.spacing(2),
  border: `1px solid rgba(144, 144, 144, 0.4)`,
  borderRadius: '25px',
  backgroundColor: '#F6F8FC',

  '&:hover': {
    borderColor: theme.palette.primary.light,
  },

  [theme.breakpoints.down('md')]: {
    maxWidth: '472px',
    justifyContent: 'space-evenly',
  },

  [theme.breakpoints.up('md')]: {
    gap: theme.spacing(1),
  },
}));

export const Label = styledMui(FormControlLabel)({
  '& .MuiFormControlLabel-label': {
    fontSize: '14px',
  },
});
