import { authSelectors } from '@/redux/auth/authSelectors';
import { Box, Paper, useMediaQuery } from '@mui/material';
import ChangePassForm from 'components/core/ChangePassForm/ChangePassForm';
import Stats from 'components/core/Stats/Stats';
import UserAvatarForm from 'components/core/UserAvatarForm/UserAvatarForm';
import UserData from 'components/core/UserData/UserData';
import { useSelector } from 'react-redux';
import { Role } from 'types/role.d';

const AccountPage = () => {
  const matches = useMediaQuery('(min-width:480px)');
  const role: Role | '' = useSelector(authSelectors.getUserRole);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Paper
        sx={{
          display: 'flex',
          padding: 2,
          gap: matches ? 0 : 4,
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        <UserAvatarForm />
        <UserData />
      </Paper>
      {role === Role.STUDENT && <Stats />}
      <ChangePassForm />
    </Box>
  );
};

export default AccountPage;
