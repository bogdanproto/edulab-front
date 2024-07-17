import { authApi } from '@/redux/auth/authApi';
import { schemaSigninUser } from '@/validators';
import { yupResolver } from '@hookform/resolvers/yup';
import AnimatedWrapper from 'components/core/AnimatedWrapper';
import PswVisibilityTogglerBtn from 'components/core/PswVisibilityTogglerBtn';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { LoginRequestData } from 'types/auth';

import {
  Form,
  SubmitBtn,
  MissedCredentialsInfo,
  ShowPromptBtn,
  Prompt,
  TextField,
  EmailLink,
  FormTitle,
  ForgotPasswordToggler,
} from './LoginForm.styled';

type LoginFormProps = {
  switchForm: (formName: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ switchForm }) => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [isPortalAccessPromptShown, setIsPortalAccessPromptShown] =
    useState<boolean>(false);

  const [loginUser, { isLoading, error }] = authApi.useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaSigninUser),
    mode: 'onSubmit',
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;

    if (isPortalAccessPromptShown) {
      timeoutId = setTimeout(() => {
        setIsPortalAccessPromptShown(false);
      }, 20000);
    } else if (!isPortalAccessPromptShown && timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    return () => {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
    };
  }, [isPortalAccessPromptShown]);

  const submitHandler = (data: LoginRequestData) => {
    loginUser(data);
  };

  return (
    <Form onSubmit={handleSubmit(submitHandler)}>
      <FormTitle>Sign in to Edulab</FormTitle>
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
        type={isPasswordShown ? 'text' : 'password'}
        label="Password"
        margin="normal"
        {...register('password')}
        InputProps={{
          endAdornment: (
            <PswVisibilityTogglerBtn
              isPasswordShown={isPasswordShown}
              setIsPasswordShown={setIsPasswordShown}
            />
          ),
        }}
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
      />
      <SubmitBtn variant="contained" type="submit" disabled={isLoading}>
        Sign In
      </SubmitBtn>
      <MissedCredentialsInfo>
        {"Don't have an account or forgot your password?"}
        <ShowPromptBtn
          type="button"
          onClick={() =>
            setIsPortalAccessPromptShown(!isPortalAccessPromptShown)
          }
        >
          Read
        </ShowPromptBtn>
      </MissedCredentialsInfo>
      <AnimatedWrapper animationTrigger={isPortalAccessPromptShown}>
        <Prompt>
          <div>
            1. If you do not have an account on the Edulab platform, please{' '}
            <EmailLink href="mailto:edu.lab@ukr.net">get in touch</EmailLink>{' '}
            with the support team to create an account.
          </div>
          <div>
            2. If you have an account but forgot your password, please click the{' '}
            <ForgotPasswordToggler onClick={() => switchForm('recover')}>
              &apos;Forgot Password?&apos;
            </ForgotPasswordToggler>
            .
          </div>
        </Prompt>
      </AnimatedWrapper>
      {error &&
        'status' in error &&
        error.status === 401 &&
        (error.data as { message?: string }).message ===
          'The password was not created, go through the password creation procedure' && (
          <Navigate to="auth/create-password" />
        )}
    </Form>
  );
};

export default LoginForm;
