import { authSelectors } from '@/redux/auth/authSelectors';
import { User, updateAvatarUrl } from '@/redux/auth/authSlice';
import { useUpdateUserMutation } from '@/redux/users/usersApi';
import stringAvatar from '@/utils/stringAvatar';
import Edit from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Avatar, Box, Fab, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserAvatarForm = () => {
  const user: User = useSelector(authSelectors.getUser);

  const [updateUser, result] = useUpdateUserMutation();

  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [img, setImg] = useState<string>(user.avatarUrl || '');
  const [imgError, setImgError] = useState<string>('');

  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file) {
      setImgError('');
      setImg('');
      if (!file.type.includes('image/')) {
        return setImgError('Wrong image type');
      }
      if (file.size >= 10000000) {
        return setImgError('Maximum image size is 10Mb');
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFileToUpload(file);
    }
  };

  useEffect(() => {
    if (
      result?.status === 'fulfilled' &&
      result?.data?.data?.avatarUrl !== user.avatarUrl
    )
      dispatch(updateAvatarUrl(result?.data?.data?.avatarUrl || ''));
    setFileToUpload(null);
  }, [dispatch, result, user.avatarUrl]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fileToUpload) {
      setImgError('Please select an image.');

      return;
    }

    try {
      await updateUser({
        file: fileToUpload,
        id: user.id as number,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        email: user.email,
        isActivated: true,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ position: 'relative', width: 150, height: 150 }}>
        {img ? (
          <Avatar
            sx={{ width: '100%', height: '100%' }}
            alt={user.firstName + ' ' + user.lastName}
            src={img}
          />
        ) : (
          <Avatar
            {...stringAvatar(user.firstName + ' ' + user.lastName)}
            style={{ width: '100%', height: '100%', fontSize: 48 }}
            alt={user.firstName + ' ' + user.lastName}
          />
        )}
        <Tooltip title={'Edit'}>
          <Fab
            color="primary"
            size="small"
            aria-label="edit"
            sx={{ position: 'absolute', bottom: 0, right: 0 }}
          >
            <Box
              component={'label'}
              sx={{
                width: '100%',
                height: '100%',
                padding: 0,
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Edit />
              <Box
                name="file"
                component={'input'}
                accept="image/*"
                onChange={handleFileChange}
                type="file"
                sx={{ width: 0, height: 0, padding: 0, margin: 0 }}
              />
            </Box>
          </Fab>
        </Tooltip>
        {fileToUpload && (
          <Tooltip title={'Save'}>
            <Fab
              color="primary"
              size="small"
              aria-label="edit"
              sx={{ position: 'absolute', bottom: 0, left: 0 }}
              type="submit"
              disabled={result.isLoading}
            >
              <SaveIcon />
            </Fab>
          </Tooltip>
        )}
      </Box>
      <Typography color={'crimson'}>{imgError}</Typography>
    </form>
  );
};

export default UserAvatarForm;
