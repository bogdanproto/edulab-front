import { Typography } from '@mui/material';
import { styled as styledMui } from '@mui/material/styles';
import { ComponentProps } from 'react';
import { Link as RouterLink } from 'react-router-dom';

type RouterLinkProps = ComponentProps<typeof RouterLink>;

type TaskLinkProps = RouterLinkProps & {
  type?: string | undefined;
};
type TaskIconProps = {
  type?: string | undefined;
};
type GradeProps = {
  type?: string | undefined;
};
type CourseTitleProps = {
  type?: string | undefined;
};

export const TaskContainer = styledMui('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.2),
  padding: theme.spacing(1.8),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#F2F6FC',
  '& > *': {
    backgroundColor: theme.palette.background.paper,
  },
  boxShadow:
    'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
}));

export const TaskLink = styledMui(RouterLink)<TaskLinkProps>(
  ({ theme, type }) => ({
    padding: theme.spacing(1),
    maxWidth: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    borderWidth: 1,
    border: '1px solid rgba(0, 0, 0, 0.25)',
    borderRadius: theme.shape.borderRadius,
    overflow: 'hidden',

    transition: theme.transitions.create(['color', 'box-shadow', 'border']),
    duration: theme.transitions.duration.shorter,
    '&:hover': {
      border: '1px solid rgba(0, 0, 0, 0.2)',
      cursor: 'pointer',
      boxShadow: theme.shadows[2],
    },
    '&:visited': {
      color:
        type === 'homework'
          ? theme.palette.primary.dark
          : theme.palette.secondary.main,
    },
  })
);

export const TaskIcon = styledMui('div')<TaskIconProps>(({ theme, type }) => ({
  color:
    type === 'homework'
      ? theme.palette.primary.dark
      : theme.palette.secondary.main,
  marginRight: theme.spacing(2),
  fontSize: theme.typography.pxToRem(32),
}));

export const TaskDescWrapper = styledMui('div')({
  flex: '1',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const TaskContent = styledMui('div')(({ theme }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.4),
}));

export const TaskType = styledMui(Typography)(({ theme }) => ({
  fontFamily: 'Inter',
  color: 'rgba(0, 0, 0, 0.75)',
  fontSize: '15px',
  fontWeight: theme.typography.fontWeightMedium,
  letterSpacing: 0.2,
}));

export const InfoWrapper = styledMui('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  rowGap: theme.spacing(0.5),

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    columnGap: theme.spacing(0.8),
  },
}));

export const CourseTitle = styledMui('span')<CourseTitleProps>(
  ({ theme, type }) => ({
    color:
      type === 'homework'
        ? theme.palette.primary.dark
        : theme.palette.secondary.main,
    letterSpacing: 0.1,
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: theme.typography.body2.fontSize,
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  })
);
export const LessonTitle = styledMui(CourseTitle)<CourseTitleProps>(
  ({ theme }) => ({
    whiteSpace: 'wrap',
    [theme.breakpoints.up('md')]: {
      whiteSpace: 'nowrap',
    },
  })
);

export const GradeStatus = styledMui('p')<GradeProps>(({ theme, type }) => ({
  display: 'none',

  [theme.breakpoints.up('sm')]: {
    display: 'block',
    borderRadius: '20px',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    backgroundColor:
      type === 'homework'
        ? theme.palette.primary.dark
        : theme.palette.secondary.main,
    color: theme.palette.common.white,
    letterSpacing: 0.8,
    fontSize: '13.5px',
  },
}));
