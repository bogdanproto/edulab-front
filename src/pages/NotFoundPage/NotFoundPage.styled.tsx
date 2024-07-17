import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { styled as styledMui } from '@mui/material/styles';

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const ContentHolder = styledMui('section')(({ theme }) => ({
  width: '100%',
  height: 'max-content',
  margin: 'auto',
  padding: theme.spacing(6),
  overflow: 'hidden',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.up('sm')]: {
    width: '600px',
  },
  [theme.breakpoints.up('md')]: {
    width: '900px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '1200px',
  },
}));

export const NotFoundImage = styledMui('img')(({ theme }) => ({
  display: 'block',
  width: '100%',

  [theme.breakpoints.up('sm')]: {
    maxWidth: '600px',
  },
}));

export const BoldText = styledMui('p')(({ theme }) => ({
  marginTop: theme.spacing(1),

  color: '#484b4d',

  fontSize: `calc(${theme.typography.h4.fontSize} - 5px)`,
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.h4.fontSize,
  },
}));

export const Text = styledMui('p')(({ theme }) => ({
  color: '#484b4d',
  lineHeight: 1.5,

  fontSize: theme.typography.h6.fontSize,
  textAlign: 'center',

  [theme.breakpoints.up('sm')]: {
    fontSize: theme.typography.h5.fontSize,
  },
}));

export const HomeButton = styledMui(Button)(({ theme }) => ({
  backgroundColor: '#3d85cc',
  fontFamily: 'Inter',
  borderRadius: '20px',
  marginTop: theme.spacing(2),
}));
