import SchoolIcon from '@mui/icons-material/School';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Box,
  ListItemText,
  Divider,
} from '@mui/material';
import { TeacherDataForStudentDashboard } from 'types/dashboard';

const TeachersCard: React.FC<{ data: TeacherDataForStudentDashboard[] }> = ({
  data,
}) => (
  <Card
    sx={{
      borderRadius: 2,
      boxShadow:
        'rgba(9, 30, 66, 0.25) 0px 1px 2px 0px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
      pl: 2,
      pr: 2,
    }}
  >
    <CardContent>
      <Box
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        p={0}
        mb={0.5}
      >
        <SchoolIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          Your Teachers
        </Typography>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List sx={{ padding: 0 }}>
        {data.map((item, index) => (
          <ListItem key={index} sx={{ py: 0.2, padding: 0 }}>
            <ListItemText
              primary={
                <Typography align="right">
                  {item.first_name + ' ' + item.last_name}
                </Typography>
              }
              secondary={
                <Typography
                  variant="body2"
                  align="right"
                  color="GrayText"
                  sx={{ lineHeight: '1.3' }}
                >{`course: ${item.course_title}`}</Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </CardContent>
  </Card>
);

export default TeachersCard;
