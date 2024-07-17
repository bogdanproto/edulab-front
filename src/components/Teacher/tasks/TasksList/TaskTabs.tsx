import { TASK_TABS } from '@/consts/tasks/taskTabs';
import { setTabValue } from '@/redux/tasks';
import PendingIcon from '@mui/icons-material/Pending';
import PlaylistAddCheckCircleIcon from '@mui/icons-material/PlaylistAddCheckCircle';
import RuleFolderIcon from '@mui/icons-material/RuleFolder';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Tabs, Tab } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

interface TaskTabsProps {
  tabValue: number;
}

const TaskTabs: React.FC<TaskTabsProps> = ({ tabValue }) => {
  const dispatch = useDispatch();

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    dispatch(setTabValue(newValue));
  };

  return (
    <Tabs
      value={tabValue}
      onChange={handleTabChange}
      aria-label="task-tabs"
      sx={{ pb: 1 }}
    >
      <Tab
        icon={<RuleFolderIcon />}
        label={TASK_TABS.IN_REVIEW}
        aria-label={TASK_TABS.IN_REVIEW}
        sx={{
          fontSize: {
            xs: '10px',
            sm: '14px',
          },
        }}
      />
      <Tab
        icon={<PlaylistAddCheckCircleIcon />}
        label={TASK_TABS.CHECKED}
        aria-label={TASK_TABS.CHECKED}
        sx={{
          fontSize: {
            xs: '10px',
            sm: '14px',
          },
        }}
      />
      <Tab
        icon={<PendingIcon />}
        label={TASK_TABS.SLACKERS}
        aria-label={TASK_TABS.SLACKERS}
        sx={{
          fontSize: {
            xs: '10px',
            sm: '14px',
          },
        }}
      />
      <Tab
        icon={<ViewListIcon />}
        label={TASK_TABS.ALL}
        aria-label={TASK_TABS.ALL}
        sx={{
          fontSize: {
            xs: '10px',
            sm: '14px',
          },
        }}
      />
    </Tabs>
  );
};

export default TaskTabs;
