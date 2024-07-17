import { Select, SelectChangeEvent } from '@mui/material';
import { useEffect } from 'react';

import { Label, Wrapper, MenuItem } from './PaginationSelector.styled';

type SelectItemsProps = {
  isSmallScreen?: boolean;
  tasksPerPage: number;
  setTasksPerPage: (value: number) => void;
};

const SelectItems: React.FC<SelectItemsProps> = ({
  isSmallScreen,
  tasksPerPage,
  setTasksPerPage,
}) => {
  const handleChange = (event: SelectChangeEvent<number>) => {
    setTasksPerPage(Number(event.target.value));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tasksPerPage]);

  return (
    <Wrapper>
      {!isSmallScreen && <Label>Per Page</Label>}
      <Select
        size="small"
        style={{ fontSize: '14.5px' }}
        variant="outlined"
        value={tasksPerPage}
        onChange={handleChange}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>15</MenuItem>
        <MenuItem value={30}>20</MenuItem>
      </Select>
    </Wrapper>
  );
};

export default SelectItems;
