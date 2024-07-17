import { paths } from '@/consts';
import { Box, Button, Stack } from '@mui/material';
import { SearchInput } from 'components/core';
import React from 'react';
import { Link } from 'react-router-dom';

type ToolsBarTeacherProps = {
  handleSearch: (value: string) => void;
  page?: string;
};

export const ToolsBarTeacher: React.FC<ToolsBarTeacherProps> = ({
  handleSearch,
}) => {
  const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(evt.target.value);
  };

  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      pb={1}
    >
      <Box sx={{ width: { xs: '100%', sm: '280px' } }}>
        <SearchInput onChange={handleInput} placeholder={'Search course'} />
      </Box>
      <Button
        variant="contained"
        component={Link}
        to={paths.teacher.courseCreate}
        sx={{ width: { xs: '100%', sm: 'initial' } }}
      >
        Create
      </Button>
    </Stack>
  );
};
