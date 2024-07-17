import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';

type TPswVisibilityTogglerBtnProps = {
  isPasswordShown: boolean;
  setIsPasswordShown: (arg: boolean) => void;
};

const PswVisibilityTogglerBtn: React.FC<TPswVisibilityTogglerBtnProps> = ({
  isPasswordShown,
  setIsPasswordShown,
}) => {
  return (
    <IconButton onClick={() => setIsPasswordShown(!isPasswordShown)} edge="end">
      {isPasswordShown ? <VisibilityOff /> : <Visibility />}
    </IconButton>
  );
};

export default PswVisibilityTogglerBtn;
