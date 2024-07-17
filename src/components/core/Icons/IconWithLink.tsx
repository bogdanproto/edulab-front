import { SvgIconComponent } from '@mui/icons-material';
import { Link } from 'react-router-dom';

type Props = {
  Icon: SvgIconComponent;
  titleAccess: string;
  to: string;
  replace?: boolean;
};

export default function IconWithLink({
  Icon,
  titleAccess,
  to,
  replace,
}: Props) {
  return (
    <Link to={to} replace={replace}>
      <Icon color="primary" titleAccess={titleAccess} />
    </Link>
  );
}
