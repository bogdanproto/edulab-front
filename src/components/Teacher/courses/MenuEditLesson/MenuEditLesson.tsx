import { Box, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import { Lesson } from 'types/course';

import { BoxHomeworksLesson } from '../BoxHomeworksLesson/BoxHomeworksLesson';
import { BoxMaterialsLesson } from '../BoxMaterialsLesson/BoxMaterialsLesson';
import { BoxTestsLesson } from '../BoxTestsLesson/BoxTestsLesson';
import { FormCreateLesson } from '../FormCreateLesson/FormCreateLesson';

type MenuEditLessonProps = {
  lesson: Lesson;
};

export const MenuEditLesson: React.FC<MenuEditLessonProps> = ({ lesson }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="Tabs lesson menu"
        >
          <Tab label="General" />
          <Tab label="Materials" />
          <Tab label="Home work" />
          <Tab label="Test" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <FormCreateLesson lesson={lesson} courseId={lesson.courseId} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BoxMaterialsLesson lesson={lesson} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <BoxHomeworksLesson lesson={lesson} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <BoxTestsLesson lesson={lesson} />
      </CustomTabPanel>
    </Box>
  );
};

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
