// import { authApi } from '@/redux/auth/authApi';
import { authApi } from '@/redux/auth/authApi';
import { schemaChangePassword } from '@/validators/schemaChangePassword';
import { yupResolver } from '@hookform/resolvers/yup';
import ExpandMoreSharpIcon from '@mui/icons-material/ExpandMoreSharp';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from '@mui/material';
import PswVisibilityTogglerBtn from 'components/core/PswVisibilityTogglerBtn';
import {
  FormTitle,
  SubmitBtn,
  TextField,
} from 'components/LoginForm/LoginForm.styled';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type ErrorData = {
  message: string;
};

const ChangePassForm: React.FC = () => {
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
  const [changePassword, { isLoading, isError, error }] =
    authApi.useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schemaChangePassword),
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (isError && 'status' in error) {
      const errorData = error.data as ErrorData | undefined;
      toast.error(`(${error.status}) ${errorData?.message}`);
    } else if (error) {
      toast.error(`(${error.toString()}`);
    }
  }, [isError, error]);

  const submitHandler = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      changePassword({
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      toast.success('Password changed successfully!');
      reset();
    } catch (error) {
      alert('Failed to change password. Please try again later.');
      console.error('Error:', error);
    }
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreSharpIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography>Change passoword</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Box component={'form'} onSubmit={handleSubmit(submitHandler)}>
          <FormTitle>Enter current password then confirm new one</FormTitle>

          <TextField
            id="currentPassword"
            type={isPasswordShown ? 'text' : 'password'}
            label="Enter your password"
            margin="normal"
            {...register('currentPassword')}
            InputProps={{
              endAdornment: (
                <PswVisibilityTogglerBtn
                  isPasswordShown={isPasswordShown}
                  setIsPasswordShown={setIsPasswordShown}
                />
              ),
            }}
            error={Boolean(errors.currentPassword)}
            helperText={errors.currentPassword?.message}
          />
          <TextField
            id="newPassword"
            type={isPasswordShown ? 'text' : 'password'}
            label="Enter new password"
            margin="normal"
            {...register('newPassword')}
            InputProps={{
              endAdornment: (
                <PswVisibilityTogglerBtn
                  isPasswordShown={isPasswordShown}
                  setIsPasswordShown={setIsPasswordShown}
                />
              ),
            }}
            error={Boolean(errors.newPassword)}
            helperText={errors.newPassword?.message}
          />
          <TextField
            id="confirmPassword"
            type={isPasswordShown ? 'text' : 'password'}
            label="Confirm new password"
            margin="normal"
            {...register('confirmPassword')}
            InputProps={{
              endAdornment: (
                <PswVisibilityTogglerBtn
                  isPasswordShown={isPasswordShown}
                  setIsPasswordShown={setIsPasswordShown}
                />
              ),
            }}
            error={Boolean(errors.confirmPassword)}
            helperText={errors.confirmPassword?.message}
          />
          <SubmitBtn variant="contained" type="submit" disabled={isLoading}>
            Change password
          </SubmitBtn>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ChangePassForm;
