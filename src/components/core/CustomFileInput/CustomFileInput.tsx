import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React, { useRef, ChangeEvent, useState } from 'react';

type CustomFileInputProps = {
  onFileChange: (file: File | null) => void;
};

const allowedFileTypes = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'application/zip',
];

const allowedFileExtensions = [
  '.jpeg',
  '.jpg',
  '.png',
  '.webp',
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.zip',
];

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }
);

const CustomFileInput: React.FC<CustomFileInputProps> = ({ onFileChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);

  const handleFileSelect = (): void => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (allowedFileTypes.includes(file.type)) {
        setSelectedFile(file);
        onFileChange(file);
      } else {
        setOpen(true);
      }
    } else {
      setSelectedFile(null);
      onFileChange(null);
    }

    if (event.target) {
      event.target.value = '';
    }
  };

  const handleClose = (_: Event | React.SyntheticEvent<Element, Event>) => {
    setOpen(false);
  };

  const handleFileRemove = (): void => {
    setSelectedFile(null);
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <input
          ref={fileInputRef}
          type="file"
          accept={allowedFileExtensions.join(',')}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <Button
          size="small"
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleFileSelect}
          style={{ textTransform: 'none' }}
        >
          Select a file
        </Button>
        <Typography variant="body2" marginLeft={1}>
          {selectedFile ? selectedFile.name : 'No files selected'}
        </Typography>
      </Box>
      {selectedFile && (
        <Button
          size="small"
          variant="outlined"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={handleFileRemove}
          style={{ textTransform: 'none' }}
        >
          Delete file
        </Button>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={'warning'}
          sx={{ width: '320px' }}
        >
          Not supported file format
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CustomFileInput;
