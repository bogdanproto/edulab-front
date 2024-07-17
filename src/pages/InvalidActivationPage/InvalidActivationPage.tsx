import InvalidActivationData from 'components/core/InvalidActivationData';
import LoginPageAndResetPswLayout from 'components/layout/LoginPageAndResetPswLayout';

const InvalidActivationPage: React.FC = () => {
  return (
    <LoginPageAndResetPswLayout>
      <InvalidActivationData />
    </LoginPageAndResetPswLayout>
  );
};

export default InvalidActivationPage;
