import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, IconButton, Typography } from '@mui/material';
import { BreadCrumbsRouter } from 'components/core';
import { FC } from 'react';

type AdminTabsHeaderProps = {
  title: string;
  showBackBtn?: boolean;
  onBackBtnClick?: () => void;
};

const AdminTabsHeader: FC<AdminTabsHeaderProps> = ({
  title,
  showBackBtn = true,
  onBackBtnClick,
}) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '28px',
          mb: '20px',
        }}
      >
        {showBackBtn && (
          <IconButton onClick={onBackBtnClick}>
            <ArrowBackIcon />
          </IconButton>
        )}

        <div style={{ marginBottom: '-8px' }}>
          <BreadCrumbsRouter />
        </div>
      </Box>
      <Typography variant="h4" component="h2">
        {title}
      </Typography>
    </Box>
  );
};

export default AdminTabsHeader;
