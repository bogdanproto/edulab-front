/* eslint-disable sonarjs/no-duplicate-string */
import { Link, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';

export const PageContent = styled('div')(({ theme }) => ({
  fontFamily: 'Inter',
  marginTop: theme.spacing(-2),
  width: '100%',
  height: '100%',
}));

export const Form = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '800px',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.2),
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F2F6FC',
  boxShadow:
    'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
  [theme.breakpoints.up('lg')]: {
    marginLeft: `calc(${theme.spacing(8)} * 2)`,
  },
}));

export const SubjectAndLessonOfHomework = styled('h3')(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: 'Inter',
  fontSize: '15px',
  paddingBottom: theme.spacing(1),
  borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
  marginBottom: theme.spacing(0.5),
}));

export const DescriptionTitle = styled('h1')(({ theme }) => ({
  marginBottom: theme.spacing(0.3),
  color: 'rgba(0, 0, 0, 0.7)',
  fontFamily: 'Inter',
  fontSize: '15px',
  fontWeight: theme.typography.fontWeightMedium,
  letterSpacing: 0.1,
  padding: theme.spacing(0),
  paddingTop: theme.spacing(1),
}));

export const HomeworkDescription = styled('div')(({ theme }) => ({
  fontFamily: 'Inter',
  fontWeight: '400',
  fontSize: `calc(${theme.typography.body2.fontSize})`,
  padding: theme.spacing(2),
  lineHeight: 1.35,
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(0, 0, 0, 0.3)',
}));

export const HomeworkSubmitDescription = HomeworkDescription;

export const TestPageLink = styled(RouterLink)(({ theme }) => ({
  textAlign: 'center',
  marginLeft: 'auto',
  backgroundColor: theme.palette.primary.main,
  textDecoration: 'none',
  color: theme.palette.secondary.contrastText,
  borderRadius: theme.shape.borderRadius,
  minWidth: '120px',
  padding: theme.spacing(1, 2),
  boxShadow: theme.shadows[1],
  fontSize: theme.typography.body2.fontSize,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));

export const HomeworkSourceLink = styled(Link)(({ theme }) => ({
  backgroundColor: '#a653b5',
  textDecoration: 'none',
  color: theme.palette.secondary.contrastText,
  borderRadius: theme.shape.borderRadius,
  width: 'fit-content',
  padding: theme.spacing(1, 2),
  boxShadow: theme.shadows[1],
  fontSize: theme.typography.body2.fontSize,
  marginLeft: 'auto',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const SubmittedHomeworkLink = styled(HomeworkSourceLink)(
  ({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  })
);

export const FileInput = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

export const FileInputWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(0, 0, 0, 0.3)',
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  width: 'fit-content',
  marginLeft: 'auto',
  textTransform: 'none',
  fontSize: theme.typography.body2.fontSize,
}));

export const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.4),
  justifyContent: 'space-between',
}));

export const MaxScore = styled('span')(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontFamily: 'Inter',
  fontSize: `calc(${theme.typography.body2.fontSize})`,
}));

export const Result = MaxScore;
export const TestStatus = MaxScore;
export const HomeworkStatus = MaxScore;
export const YourTestScores = MaxScore;
export const YourHomeworkGrade = MaxScore;
export const NumberOfQuestions = MaxScore;
export const NumberOfCorrectAnswers = MaxScore;
export const Score = MaxScore;

export const GroupWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.6),
}));
