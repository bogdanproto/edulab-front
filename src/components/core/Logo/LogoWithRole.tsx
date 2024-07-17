import { authSelectors } from '@/redux/auth/authSelectors';
import { Typography } from '@mui/material';
import Logo from 'components/core/Logo/Logo';
import { useSelector } from 'react-redux';

function LogoWithRole(): JSX.Element {
  const userRole = useSelector(authSelectors.getUserRole);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Logo />
      {userRole && (
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 'calc(100% + 6px)',
            backgroundColor: 'white',
            borderRadius: 40,
            padding: '0px 6px 0px',
          }}
        >
          <Typography
            component="span"
            color={'primary.main'}
            variant="caption"
            style={{
              textTransform: 'uppercase',
              textDecoration: 'none',
            }}
          >
            {userRole}
          </Typography>
        </div>
      )}
    </div>
  );
}

export default LogoWithRole;
