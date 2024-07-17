import { Typography, Paper, Box } from '@mui/material';

interface StudentLessonGeneralProps {
  title: string;
  description: string;
}
const StudentLessonGereral: React.FC<StudentLessonGeneralProps> = ({
  title,
  description,
}) => {
  return (
    <Box component="section" sx={{ maxWidth: '100%', mx: 'auto' }}>
      <Box
        sx={{ my: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}
      >
        <Typography variant="h6" color="textSecondary">
          Theme
        </Typography>
        <Paper
          variant="outlined"
          square
          sx={{ p: 1, my: 1, bgcolor: 'action.hover' }}
        >
          <Typography variant="body1">{title}</Typography>
        </Paper>
      </Box>
      <Box
        sx={{ my: 2, p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}
      >
        <Typography variant="h6" color="textSecondary">
          Description
        </Typography>
        <Paper
          variant="outlined"
          square
          sx={{ p: 1, my: 1, bgcolor: 'action.hover', whiteSpace: 'pre-line' }}
        >
          <Typography variant="body1">{description}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default StudentLessonGereral;
