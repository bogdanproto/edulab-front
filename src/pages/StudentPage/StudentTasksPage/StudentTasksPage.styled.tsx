import { styled as styledMui } from '@mui/material/styles';

export const PageContentWrapper = styledMui('section')(({ theme }) => ({
  width: '100%',
  height: '100%',

  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(1),
  marginTop: theme.spacing(-2),
}));

export const PageSelectionWrapper = styledMui('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  columnGap: theme.spacing(1),
}));

export const PaginationSection = styledMui('div')(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  display: 'flex',

  gap: theme.spacing(1),
  alignItems: 'center',
  justifyContent: 'space-between',
}));

export const NoTasksFoundText = styledMui('p')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: 'Helvetica',
  fontSize: '17.5px',
}));
