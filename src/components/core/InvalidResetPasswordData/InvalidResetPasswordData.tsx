import { useNavigate } from 'react-router-dom';

import {
  Form,
  SubmitBtn,
  ErrorPrompt,
  FormTitle,
} from './InvalidResetPasswordData.styled';

const InvalidResetPasswordData: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Form>
      <FormTitle>Password Reset Error</FormTitle>
      <ErrorPrompt>
        Invalid or expired credentials provided for password reset on the Edulab
        platform. Go through the password reset procedure again.
      </ErrorPrompt>
      <SubmitBtn
        variant="contained"
        type="button"
        onClick={() => navigate('/')}
      >
        Go to main page
      </SubmitBtn>
    </Form>
  );
};

export default InvalidResetPasswordData;
