import Diversity3Icon from '@mui/icons-material/Diversity3';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import GradingIcon from '@mui/icons-material/Grading';
import GroupIcon from '@mui/icons-material/Group';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import QuizIcon from '@mui/icons-material/Quiz';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import RuleIcon from '@mui/icons-material/Rule';
// import TaskIcon from '@mui/icons-material/Task';

export const navIcons = {
  dashboard: EqualizerIcon,
  users: GroupIcon,
  groups: Diversity3Icon,
  courses: LocalLibraryIcon,
  teachers: RecordVoiceOverIcon,
  // check: RuleIcon,
  tests: QuizIcon,
  tasks: RuleIcon,
  grades: GradingIcon,
} as Record<
  string,
  (props: import('@mui/material').SvgIconProps) => JSX.Element
>;
