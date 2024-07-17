import Logo from 'components/core/Logo/Logo';
import { NotifyManager } from 'components/Notify';
import ReactDOM from 'react-dom';

import {
  Main,
  SideDecor,
  LogoHolder,
  SloganText,
  FormHolder,
} from './LoginPageAndResetPswLayout.styled';

type LoginPageAndResetPswLayoutProps = {
  children: React.ReactNode;
};

const portalRoot = document.getElementById('toast-portal');

const LoginPageAndResetPswLayout: React.FC<LoginPageAndResetPswLayoutProps> = ({
  children,
}) => {
  return (
    <Main>
      <SideDecor>
        <LogoHolder to={'/'}>
          <Logo />
          <SloganText>Open the door to knowledge</SloganText>
        </LogoHolder>
      </SideDecor>
      <FormHolder>{children}</FormHolder>
      {portalRoot && ReactDOM.createPortal(<NotifyManager />, portalRoot)}
    </Main>
  );
};

export default LoginPageAndResetPswLayout;
