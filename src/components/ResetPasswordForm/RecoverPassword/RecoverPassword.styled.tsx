import styled from '@emotion/styled';
import { Button, TextField as Input } from '@mui/material';
import { styled as styledMui } from '@mui/material/styles';

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
    paddingTop: `calc(${theme.spacing(10)} * 2)`,
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

export const MissedCredentialsInfo = styledMui('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.text.primary,
}));

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

export const Prompt = styledMui('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  fontSize: theme.typography.body2.fontSize,
  lineHeight: 1.4,
  textAlign: 'left',
  color: theme.palette.text.primary,
  backgroundColor: '#a0d1fa6c',
  borderRadius: '24px',
}));

export const EmailLink = styledMui('a')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: theme.typography.body2.fontSize,
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));

export const ForgotPasswordToggler = styledMui('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: theme.typography.body2.fontSize,
  cursor: 'pointer',
  textDecoration: 'underline',
  '&:hover': {
    color: theme.palette.primary.dark,
  },
}));
