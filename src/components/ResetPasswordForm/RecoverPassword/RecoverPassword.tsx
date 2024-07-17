/* eslint-disable no-console */
import { authApi } from '@/redux/auth/authApi';
import { schemaRecoverCredentials } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { RecoverCredentialsRequestData } from 'types/auth';

import {
  Form,
  SubmitBtn,
  // MissedCredentialsInfo,
  // ShowPromptBtn,
  TextField,
  FormTitle,
  Prompt,
} from './RecoverPassword.styled';

const LoginForm: React.FC = () => {
  const [recoverCredentials, { isLoading, isSuccess }] =
    authApi.useRecoverCredentialsMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRecoverCredentials),
    mode: 'onSubmit',
  });

  const submitHandler = (data: RecoverCredentialsRequestData) => {
    recoverCredentials(data);
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormTitle>Recover Password on Edulab</FormTitle>
      <TextField
        id="email"
        type="email"
        label="Email"
        margin="normal"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />
      <SubmitBtn variant="contained" type="submit" disabled={isLoading}>
        Recover Password
      </SubmitBtn>
      {/* <MissedCredentialsInfo>
        To return to the SignIn form, click
        <ShowPromptBtn type="button" onClick={() => switchForm('login')}>
          Go Back
        </ShowPromptBtn>
      </MissedCredentialsInfo> */}
      {isSuccess && (
        <Prompt>
          <div>
            An email with instruction for activating your account and creating a
            password has been sent to your email.
          </div>
        </Prompt>
      )}
    </Form>
  );
};

export default LoginForm;
