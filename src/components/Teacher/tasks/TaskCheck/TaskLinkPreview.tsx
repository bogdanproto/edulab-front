import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Typography, Link, Box } from '@mui/material';
import React from 'react';

interface LinkPreviewProps {
  url: string;
  maxLength?: number;
}

const LinkPreview: React.FC<LinkPreviewProps> = ({ url, maxLength = 30 }) => {
  const lastSlashIndex = url.lastIndexOf('/');
  const filePathWithExtension = url.slice(lastSlashIndex + 1);
  const shortenedUrl =
    filePathWithExtension.length > maxLength
      ? `...${filePathWithExtension.slice(-maxLength + 3)}`
      : filePathWithExtension;
  const fileExtension = url.split('.').pop()?.toLowerCase();
  let fileIcon;

  switch (fileExtension) {
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      fileIcon = <ImageIcon />;
      break;
    case 'mp4':
    case 'avi':
    case 'mov':
      fileIcon = <VideocamIcon />;
      break;
    case 'js':
    case 'jsx':
    case 'ts':
    case 'tsx':
    case 'py':
    case 'java':
    case 'cpp':
      fileIcon = <CodeIcon />;
      break;
    default:
      fileIcon = <InsertDriveFileIcon />;
  }

  return (
    <Box display="flex" alignItems="center">
      <Typography variant="body1" color="GrayText" mr={1}>
        Submitted File:
      </Typography>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ display: 'inline-flex', alignItems: 'center' }}
      >
        {fileIcon}
        <Typography variant="body1" ml={1}>
          {shortenedUrl}
        </Typography>
      </Link>
    </Box>
  );
};

export default LinkPreview;
