import { MenuItem as MenuItemStyled } from '@mui/material';
import { styled as styledMui } from '@mui/material/styles';

export const Wrapper = styledMui('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const Label = styledMui('label')({
  color: 'rgba(0, 0, 0, 0.9)',
  fontSize: '14.5px',
});
export const MenuItem = styledMui(MenuItemStyled)({
  color: 'rgba(0, 0, 0, 0.9)',
  fontSize: '14.5px',
});
