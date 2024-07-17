import { authSelectors } from '@/redux/auth/authSelectors';
import { User } from '@/redux/auth/authSlice';
import { useGetUserByIdQuery } from '@/redux/users/usersApi';
import { Box, Chip, List, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const UserData = () => {
  const user: User = useSelector(authSelectors.getUser);

  const { data } = useGetUserByIdQuery(user?.id || -1);

  let userData = null;

  if (data && data.data) {
    userData = data.data;
  }

  return (
    <Box>
      {userData && (
        <>
          <Typography
            component={'h3'}
            sx={{ fontSize: '24px', fontWeight: 600 }}
          >
            {user.firstName + ' ' + user.lastName}
          </Typography>
          <Typography component={'h5'} sx={{ fontSize: '20px', color: 'gray' }}>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </Typography>
          <List
            component={'ul'}
            sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}
          >
            {userData.groupNames &&
              userData.groupNames?.length > 0 &&
              userData.groupNames?.map((group: string) => (
                <Chip key={group} label={group} />
              ))}
          </List>
        </>
      )}
    </Box>
  );
};

export default UserData;
