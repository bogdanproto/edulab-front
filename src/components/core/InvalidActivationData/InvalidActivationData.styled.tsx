import styled from '@emotion/styled';
import { Button, TextField as Input } from '@mui/material';
import { styled as styledMui } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

export const Form = styledMui('form')(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(0),
  width: '100%',
  maxWidth: '416px',
  paddingTop: theme.spacing(10),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),

  [theme.breakpoints.up('md')]: {
    paddingTop: `calc(${theme.spacing(8)} * 2)`,
  },
  [theme.breakpoints.up('lg')]: {
    marginLeft: `calc(${theme.spacing(10)} * 2)`,
    marginRight: theme.spacing(0),
  },
}));

export const FormTitle = styledMui('h1')(({ theme }) => ({
  marginRight: theme.spacing(0),
  marginLeft: theme.spacing(0),
  marginTop: theme.spacing(0),
  marginBottom: theme.spacing(3),

  textAlign: 'center',
  fontFamily: 'Inter',
  fontWeight: 700,
  fontSize: theme.typography.h5.fontSize,
}));

export const TextField = styled(Input)`
  width: 100%;
`;

export const SubmitBtn = styledMui(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
  width: '100%',
  height: '54px',
  borderRadius: '30px',
}));

export const PasswordSuccessfullyChangedInfo = styledMui('div')(
  ({ theme }) => ({
    textAlign: 'center',
    fontSize: theme.typography.body2.fontSize,
    color: theme.palette.text.primary,
  })
);

export const ShowPromptBtn = styledMui('button')(({ theme }) => ({
  border: 'none',
  color: theme.palette.primary.main,
  fontSize: theme.typography.body2.fontSize,
  textDecoration: 'underline',
  backgroundColor: 'inherit',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

export const LinkToSignIn = styledMui(NavLink)(({ theme }) => ({
  fontFamily: 'Inter',
  fontSize: '17px',
  border: 'none',
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

export const Prompt = styledMui('div')(({ theme }) => ({
  marginTop: theme.spacing(3.5),
  fontFamily: 'Inter',
  padding: theme.spacing(2),
  fontSize: '16px',
  lineHeight: 1.4,
  textAlign: 'center',
  color: theme.palette.text.primary,
  backgroundColor: '#a0d1fa6c',
  borderRadius: '20px',
}));

export const ErrorPrompt = styledMui(Prompt)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: '#ff0000a9',
}));

export const EmailLink = styledMui('a')(({ theme }) => ({
  fontSize: '16px',
  lineHeight: 1.4,
  color: theme.palette.common.white,
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.secondary.main,
  },
}));
