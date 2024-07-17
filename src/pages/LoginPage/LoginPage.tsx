import LoginPageAndResetPswLayout from 'components/layout/LoginPageAndResetPswLayout';
import LoginForm from 'components/LoginForm';
import RecoverCredentialsForm from 'components/RecoverCredentialsForm';
import { useState } from 'react';

const LoginPage: React.FC = () => {
  const [formShown, setFormShown] = useState<string>('login');

  return (
    <LoginPageAndResetPswLayout>
      {formShown === 'login' && <LoginForm switchForm={setFormShown} />}
      {formShown === 'recover' && (
        <RecoverCredentialsForm switchForm={setFormShown} />
      )}
    </LoginPageAndResetPswLayout>
  );
};

export default LoginPage;
