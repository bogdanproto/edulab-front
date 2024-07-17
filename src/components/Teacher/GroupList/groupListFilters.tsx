import { useTypeDispatch } from '@/hooks';
import { setFilterGroups } from '@/redux/groups';
import { Box } from '@mui/material';
import { SearchInput } from 'components/core';
import { ChangeEvent, useEffect } from 'react';

export default function GroupListFilters() {
  const dispatch = useTypeDispatch();

  useEffect(() => {
    dispatch(setFilterGroups(''));
  }, [dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterGroups(e.target.value));
  };

  return (
    <Box sx={{ width: { xs: '100%', sm: '280px' } }}>
      <SearchInput onChange={handleInputChange} placeholder="Search groups" />
    </Box>
  );
}
