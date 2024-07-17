import AssignmentIcon from '@mui/icons-material/Assignment';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import CastForEducationIcon from '@mui/icons-material/CastForEducation';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import { NotificationStatus, NotificationTypes } from 'types/notification.d';

type NotificationIconTypeProps = {
  type: NotificationTypes;
  status: NotificationStatus;
};

export const NotificationIconType: React.FC<NotificationIconTypeProps> = ({
  type,
  status,
}) => {
  return (
    <>
      {type === NotificationTypes.STUDENT_HW_DONE && (
        <AssignmentIcon
          color={status === 'viewed' ? 'disabled' : 'primary'}
          fontSize="medium"
        />
      )}

      {type === NotificationTypes.TEACHER_HW_CHECKED && (
        <AssignmentTurnedInIcon
          color={status === 'viewed' ? 'disabled' : 'primary'}
          fontSize="medium"
        />
      )}

      {type === NotificationTypes.STUDENT_GET_COURSE && (
        <CastForEducationIcon
          color={status === 'viewed' ? 'disabled' : 'primary'}
          fontSize="medium"
        />
      )}

      {!type && (
        <CircleNotificationsIcon
          color={status === 'viewed' ? 'disabled' : 'primary'}
          fontSize="medium"
        />
      )}
    </>
  );
};
