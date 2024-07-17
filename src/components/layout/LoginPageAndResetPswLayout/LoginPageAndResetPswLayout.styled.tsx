/* eslint-disable no-console */
import styled from '@emotion/styled';
import { styled as styledMui } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const imgUrl = new URL('../../../assets/images/side-decor.png', import.meta.url)
  .href;

export const Main = styledMui('main')(({ theme }) => ({
  flexGrow: 1,

  [theme.breakpoints.up('md')]: {
    display: 'grid',
    gridTemplateColumns: '400px auto',
    gridAutoRows: 'auto',
  },
}));

export const SideDecor = styledMui('aside')(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    width: '100%',
    paddingTop: '50px',
    display: 'flex',
    justifyContent: 'center',

    backgroundSize: '80px',
    backgroundRepeat: 'repeat',
    backgroundColor: theme.palette.primary.light,
    backgroundImage: `url('${imgUrl}')`,
  },
}));

export const LogoHolder = styledMui(Link)(({ theme }) => ({
  width: '260px',
  height: '260px',
  paddingTop: theme.spacing(3),

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  textDecoration: 'none',

  backgroundColor: theme.palette.primary.main,
  border: `5px solid ${theme.palette.common.white}`,
  borderRadius: '50%',
  overflow: 'hidden',
  transition: 'all 200ms ease',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const SloganText = styledMui('p')(({ theme }) => ({
  textAlign: 'center',
  fontFamily: 'Inter',
  fontWeight: 500,
  fontSize: theme.typography.h6.fontSize,
  lineHeight: 1.2,
  padding: theme.spacing(3),
  color: theme.palette.common.white,
}));

export const FormHolder = styled.div`
  height: 100%;
`;
