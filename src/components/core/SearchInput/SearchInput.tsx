import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { InputAdornment, OutlinedInput } from '@mui/material';

type SearchInputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const SearchInput: React.FC<SearchInputProps> = ({
  onChange,
  placeholder,
}) => {
  return (
    <>
      <OutlinedInput
        fullWidth
        placeholder={placeholder}
        startAdornment={
          <InputAdornment position="start">
            <SearchOutlinedIcon fontSize="medium" />
          </InputAdornment>
        }
        onChange={onChange}
        sx={{ height: '48px' }}
      />
    </>
  );
};
