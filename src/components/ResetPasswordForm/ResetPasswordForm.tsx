import { authApi } from '@/redux/auth/authApi';
import { schemaCreatePassword } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import PswVisibilityTogglerBtn from 'components/core/PswVisibilityTogglerBtn';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import RecoverPassword from './RecoverPassword';
import {
  Form,
  SubmitBtn,
  Prompt,
  TextField,
  FormTitle,
  ErrorPrompt,
} from './ResetPasswordForm.styled';

const ResetPasswordForm: React.FC = () => {
  const [isNewPasswordShown, setIsNewPasswordShown] = useState<boolean>(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] =
    useState<boolean>(false);

  const { activationLink } = useParams();

  const [success, setIsSuccess] = useState('false');
  const [showPswRecoveryForm, setShowPswRecoveryForm] =
    useState<boolean>(false);

  const [createPassword, { isLoading, isSuccess, isError, error }] =
    authApi.useCreatePasswordMutation();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaCreatePassword),
    mode: 'onSubmit',
  });

  const submitHandler = (data: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    createPassword({
      email: data.email,
      password: data.password,
      activationLink: activationLink || '',
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setIsSuccess('true');
    }

    if (
      isError &&
      'status' in error &&
      error.status === 401 &&
      typeof error.data === 'object' &&
      error.data !== null &&
      'message' in error.data &&
      typeof error.data.message === 'string' &&
      error.data.message.includes(
        'Your password has already been created before'
      )
    ) {
      setIsSuccess('password_exists');
    }
  }, [isSuccess, setIsSuccess, isError, error]);

  if (success === 'true') {
    return (
      <Form>
        <FormTitle>Password Created</FormTitle>
        <Prompt>
          Your password has been successfully created. Click the button below to
          sign in.
        </Prompt>
        <SubmitBtn
          variant="contained"
          type="button"
          onClick={() => navigate('/auth/sign-in')}
        >
          Go to Sign In Page
        </SubmitBtn>
      </Form>
    );
  }

  if (showPswRecoveryForm) {
    return <RecoverPassword />;
  }

  if (success === 'password_exists') {
    return (
      <Form>
        <FormTitle>Password Already Exists</FormTitle>
        <ErrorPrompt>
          Error: Your password has already been created before, so if you forgot
          it, click the button below
        </ErrorPrompt>
        <SubmitBtn
          variant="contained"
          type="button"
          onClick={() => setShowPswRecoveryForm(true)}
        >
          Reset Password
        </SubmitBtn>
      </Form>
    );
  }

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormTitle>Create Edulab Password</FormTitle>
      <TextField
        id="email"
        type="email"
        label="Email"
        margin="normal"
        {...register('email')}
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <TextField
        id="password"
        type={isNewPasswordShown ? 'text' : 'password'}
        label="Create Your Password"
        margin="normal"
        {...register('password')}
        InputProps={{
          endAdornment: (
            <PswVisibilityTogglerBtn
              isPasswordShown={isNewPasswordShown}
              setIsPasswordShown={setIsNewPasswordShown}
            />
          ),
        }}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <TextField
        id="confirmPassword"
        type={isConfirmPasswordShown ? 'text' : 'password'}
        label="Confirm Password"
        margin="normal"
        {...register('confirmPassword')}
        InputProps={{
          endAdornment: (
            <PswVisibilityTogglerBtn
              isPasswordShown={isConfirmPasswordShown}
              setIsPasswordShown={setIsConfirmPasswordShown}
            />
          ),
        }}
        error={Boolean(errors.confirmPassword)}
        helperText={errors.confirmPassword?.message}
      />
      <SubmitBtn variant="contained" type="submit" disabled={isLoading}>
        Create Password
      </SubmitBtn>
    </Form>
  );
};

export default ResetPasswordForm;
