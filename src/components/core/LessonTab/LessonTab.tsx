import { Box, Tab, Tabs } from '@mui/material';
import React, { ReactNode, useState } from 'react';

type LessonTabProps = {
  tabContents: { key: string; content: ReactNode }[];
};

export const LessonTab: React.FC<LessonTabProps> = ({ tabContents }) => {
  const [value, setValue] = useState(tabContents[0].key);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="lesson tabs">
          {tabContents.map(tab => (
            <Tab key={tab.key} label={tab.key} value={tab.key} />
          ))}
        </Tabs>
      </Box>
      {tabContents.map(tab => (
        <CustomTabPanel key={tab.key} value={value} index={tab.key}>
          {tab.content}
        </CustomTabPanel>
      ))}
    </Box>
  );
};

type TabPanelProps = {
  children: ReactNode;
  index: string;
  value: string;
};
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lesson-tabpanel-${index}`}
      aria-labelledby={`lesson-tab-${index}`}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
