import { useLocalStorage } from '@/hooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import SearchIcon from '@mui/icons-material/Search';
import { useMediaQuery } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { SyntheticEvent } from 'react';
import { useState } from 'react';

import { FilterWrapper, Input } from './TaskFilter.styled';

type TasksFilterProps = {
  handleSearch: (value: string | null) => void;
  options: string[];
  page?: string;
};

const TasksFilter: React.FC<TasksFilterProps> = ({ handleSearch, options }) => {
  const [searchValue, setSearchValue] = useLocalStorage('searchValue', '');
  const [open, setOpen] = useState(false);
  const isSmallScreen = useMediaQuery('(max-width:380px)');

  const handleInputSearch = (
    _: SyntheticEvent<Element, Event>,
    value: string | null
  ) => {
    setSearchValue(value || '');
    handleSearch(value);
  };

  return (
    <FilterWrapper>
      <Autocomplete
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        value={searchValue}
        isOptionEqualToValue={(option, value) =>
          option === value || value === ''
        }
        onFocus={event => (event.target as HTMLInputElement).select()}
        onChange={handleInputSearch}
        options={[...new Set(options)]}
        clearOnEscape={true}
        renderInput={params => (
          <Input
            {...params}
            variant="outlined"
            label={searchValue ? 'Find or choose tasks by course' : ''}
            size="small"
            placeholder={
              isSmallScreen
                ? 'Find tasks by course'
                : 'Find or choose tasks by course'
            }
            // placeholder="Find or choose tasks by course"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    style={{
                      marginRight: '-10px',
                    }}
                  >
                    <SearchIcon style={{ fontSize: '22px' }} />
                  </IconButton>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {!searchValue && (
                    <IconButton
                      style={{ marginRight: '4px' }}
                      onClick={event => {
                        event.stopPropagation();
                        setOpen(prevOpen => !prevOpen);
                      }}
                    >
                      <ArrowDropDownIcon
                        fontSize="small"
                        style={{ fontSize: '26px' }}
                      />
                    </IconButton>
                  )}
                  {searchValue && (
                    <IconButton
                      style={{ marginRight: '4px' }}
                      edge="end"
                      onClick={() => {
                        setSearchValue('');
                        handleSearch(null);
                      }}
                    >
                      <HighlightOffIcon fontSize="small" />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
              style: { paddingRight: 0, paddingLeft: '10px' },
            }}
          />
        )}
      />
    </FilterWrapper>
  );
};

export default TasksFilter;
