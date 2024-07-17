import { styled as styledMui } from '@mui/material/styles';

type TabCaptionType = {
  active?: boolean;
};
type TasksCounterType = TabCaptionType;

export const TabsHolder = styledMui('div')<TabCaptionType>({
  width: '100%',
  display: 'flex',
  gap: '10px',
  justifyContent: 'flex-start',
  alignItems: 'center',
  borderBottom: '1px solid rgba(9, 30, 66, 0.127)',
});

export const TabCaption = styledMui('div')<TabCaptionType>(
  ({ theme, active }) => ({
    display: 'flex',
    marginBottom: '-1.6px',
    height: '35.4px',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100px',
    fontFamily: 'Helvetica',
    userSelect: 'none',
    fontWeight: 500,
    color: 'rgba(28, 30, 30, 0.85)',
    backgroundColor: 'rgba(221, 233, 249, 0.705)',
    textAlign: 'center',
    borderTop: '1px solid rgba(9, 30, 66, 0.127)',
    borderLeft: '1px solid rgba(9, 30, 66, 0.126)',
    borderRight: '1px solid rgba(9, 30, 66, 0.126)',
    borderTopRightRadius: '10px',
    borderTopLeftRadius: '10px',
    padding: theme.spacing(0.6, 1.3),

    transition: theme.transitions.create([
      'box-shadow',
      'background-color',
      'color',
    ]),
    duration: theme.transitions.duration.shorter,
    '&:hover': {
      cursor: 'pointer',
      boxShadow:
        'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
    },
    ...(active && {
      height: '39px',
      padding: theme.spacing(0.8, 1.3),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    }),

    '@media (min-width: 360px)': {
      justifyContent: 'center',
      minWidth: '100px',
    },
    '@media (min-width: 510px)': {
      justifyContent: 'space-between',
      minWidth: '150px',
    },
  })
);

export const TasksCounter = styledMui('span')<TasksCounterType>(
  ({ theme, active }) => ({
    display: 'none',
    '@media (min-width: 510px)': {
      fontFamily: 'Inter',
      minWidth: '25px',
      minHeight: '25px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '50%',
      fontSize: '12px',
      padding: theme.spacing(0.5, 0.5),
      backgroundColor: theme.palette.common.white,
      border: `1px solid rgba(28, 30, 30, 0.55)`,
      color: 'rgba(28, 30, 30, 0.55)',
      ...(active && {
        border: `1px solid ${theme.palette.primary.main}`,
        backgroundColor: theme.palette.common.white,
        color: theme.palette.primary.main,
      }),
    },
  })
);
