import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { Badge, Box, IconButton, Stack } from '@mui/material';
import { useState } from 'react';

import Picture from '@/assets/images/picture.svg';

import { VisuallyHiddenInput } from '../Inputs/VisuallyHiddenInput';

type HFInputImageProps = {
  name: string;
  sizeImg?: string;
  register: object;
  actualImage: string | undefined;
  onChange: (value: boolean) => void;
};

export const HFInputImage: React.FC<HFInputImageProps> = ({
  register,
  sizeImg,
  name,
  actualImage,
  onChange,
}) => {
  const [previewImage, setPreviewImage] = useState<string | undefined>(
    actualImage
  );

  const handleImageChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      onChange(true);
    }
  };

  const handleClearImage = () => {
    setPreviewImage(undefined);
    onChange(true);
  };

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={
        <Stack
          display={'flex'}
          flexDirection={'row'}
          gap={'8px'}
          width={`${previewImage ? '96px' : '24px'}`}
        >
          <IconButton
            component="label"
            size="small"
            sx={{
              backgroundColor: 'white',
              '&:hover': {
                color: 'primary.main',
                backgroundColor: 'white',
              },
            }}
          >
            <DownloadIcon fontSize="small" />
            <VisuallyHiddenInput
              type="file"
              accept=".jpg, .jpeg, .png, .gif, .bmp, .tif"
              {...register}
              onChange={handleImageChange}
            />
          </IconButton>
          {previewImage && (
            <IconButton
              size="small"
              onClick={handleClearImage}
              sx={{
                backgroundColor: 'white',
                '&:hover': {
                  color: 'error.main',
                  backgroundColor: 'white',
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
        </Stack>
      }
    >
      <Box
        borderRadius="4px"
        overflow="hidden"
        sx={{
          width: { xs: '100%', sm: sizeImg },
          height: { xs: 'auto', sm: sizeImg },
          border: previewImage ? '1px solid lightGrey' : 'none',
        }}
      >
        <img alt={name} src={previewImage ? previewImage : Picture} />
      </Box>
    </Badge>
  );
};
