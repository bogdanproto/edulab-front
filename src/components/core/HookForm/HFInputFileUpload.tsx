import DownloadIcon from '@mui/icons-material/Download';
import { Box, IconButton, Typography } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';

import { VisuallyHiddenInput } from '../Inputs/VisuallyHiddenInput';

type HFInputFileUploadProps = {
  error: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegisterReturn;
};

export const HFInputFileUpload: React.FC<HFInputFileUploadProps> = ({
  register,
  error,
}) => {
  return (
    <Box>
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
        <DownloadIcon fontSize="medium" />
        <VisuallyHiddenInput
          type="file"
          accept=".txt, .pdf, .png, .jpg, .jpeg., .gif, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
          {...register}
        />
      </IconButton>
      {error && (
        <Typography
          display="block"
          variant="caption"
          color="error"
          sx={{ position: 'absolute' }}
        >
          {error}
        </Typography>
      )}
    </Box>
  );
};
