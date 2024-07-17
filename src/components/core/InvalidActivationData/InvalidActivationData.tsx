import { useNavigate } from 'react-router-dom';

import {
  Form,
  SubmitBtn,
  ErrorPrompt,
  FormTitle,
  EmailLink,
} from './InvalidActivationData.styled';

const InvalidActivationData: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Form>
      <FormTitle>Invalid Activation Information</FormTitle>
      <ErrorPrompt>
        Incorrect or expired account activation data on the Edulab platform.{' '}
        <div>
          To receive up-to-date information for activating your account, please{' '}
          <EmailLink href="mailto:edu.lab@ukr.net">get in touch</EmailLink> with
          the support team.
        </div>
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

export default InvalidActivationData;
