/* eslint-disable no-console */
import { authApi } from '@/redux/auth/authApi';
import { schemaRecoverCredentials } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from 'react-hook-form';
import { RecoverCredentialsRequestData } from 'types/auth';

import {
  Form,
  SubmitBtn,
  MissedCredentialsInfo,
  ShowPromptBtn,
  TextField,
  FormTitle,
  Prompt,
} from './RecoverCredentialsForm.styled';

type LoginFormProps = {
  switchForm?: (formName: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ switchForm }) => {
  const [recoverCredentials, { isLoading, isSuccess }] =
    authApi.useRecoverCredentialsMutation();
  // console.log(switchForm);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaRecoverCredentials),
    mode: 'onSubmit',
  });

  const submitHandler = (data: RecoverCredentialsRequestData) => {
    recoverCredentials(data);
    reset();
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
        {isLoading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          'Recover Password'
        )}
      </SubmitBtn>
      <MissedCredentialsInfo>
        To return to the SignIn form, click
        <ShowPromptBtn
          type="button"
          onClick={() => (switchForm ? switchForm('login') : undefined)}
        >
          Go Back
        </ShowPromptBtn>
      </MissedCredentialsInfo>
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
