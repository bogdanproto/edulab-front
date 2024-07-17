import LoginPageAndResetPswLayout from 'components/layout/LoginPageAndResetPswLayout';
import ResetPasswordForm from 'components/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  return (
    <LoginPageAndResetPswLayout>
      <ResetPasswordForm />
    </LoginPageAndResetPswLayout>
  );
};

export default ResetPasswordPage;
