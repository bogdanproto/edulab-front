import { CourseProgress } from '@/utils/transformTasksCollection';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

const DashboardCard: React.FC<{ data: CourseProgress }> = ({ data }) => (
  <Card
    sx={{
      marginBottom: 2.5,
      borderRadius: 2,
      boxShadow:
        'rgba(9, 30, 66, 0.25) 0px 1px 2px 0px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
      paddingLeft: 0,
      paddingRight: 0,
    }}
  >
    <CardContent style={{ paddingBottom: '8px' }}>
      <Box display="flex" alignItems="center" mb={0.5} paddingLeft={2}>
        <MenuBookIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="div">
          {data.courseTitle}
        </Typography>
      </Box>

      <Accordion style={{ boxShadow: 'none' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box
            mb={0}
            style={{
              width: '100%',
              paddingRight: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <Box display="flex" alignItems="center" style={{ gap: '4px' }}>
              <Typography variant="body1" color="rgba(0, 0, 0, 0.8)">
                Tasks completed:
              </Typography>
              <Typography variant="body1" color="rgba(0, 0, 0, 0.8)">
                {data.completedTasks} of {data.totalTasks}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(data.completedTasks / data.totalTasks) * 100}
              color="primary"
              sx={{ height: '8px' }}
            />
            <Typography variant="body2" color="rgba(0, 0, 0, 0.8)">
              Progress:{' '}
              {((data.completedTasks / data.totalTasks) * 100).toFixed(0)}%
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
        >
          <Box style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Box display="flex" alignItems="center" style={{ gap: '4px' }}>
              <Typography variant="body1" color="rgba(0, 0, 0, 0.8)">
                Tests completed:
              </Typography>
              <Typography variant="body1" color="rgba(0, 0, 0, 0.8)">
                {data.completedTests} of {data.totalTests}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(data.completedTests / data.totalTests) * 100}
              color="secondary"
              sx={{ height: '8px' }}
            />
            <Typography variant="body2" color="rgba(0, 0, 0, 0.8)">
              Progress:{' '}
              {((data.completedTests / data.totalTests) * 100).toFixed(0)}%
            </Typography>
          </Box>

          <Box style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Box display="flex" alignItems="center" style={{ gap: '4px' }}>
              <Typography variant="body1" color="rgba(0, 0, 0, 0.8)">
                Homeworks completed:
              </Typography>
              <Typography variant="body1" color="rgba(0, 0, 0, 0.8)">
                {data.completedHomeworks} of {data.totalHomeworks}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={(data.completedHomeworks / data.totalHomeworks) * 100}
              color="success"
              sx={{ height: '8px' }}
            />
            <Typography variant="body2" color="rgba(0, 0, 0, 0.8)">
              Progress:{' '}
              {((data.completedHomeworks / data.totalHomeworks) * 100).toFixed(
                0
              )}
              %
            </Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
    </CardContent>
  </Card>
);

export default DashboardCard;
