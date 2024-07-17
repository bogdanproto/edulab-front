export type Item = {
  id: number;
  value: number;
  label: string;
};

export type Course = {
  label: string;
  item: Item[];
};

export type Group = {
  label: string;
  courses: {
    [courseId: number]: Course;
  };
};

export type DBtaskStatusByGroupDataTypes = {
  [groupId: number]: Group;
};

export type DBTaskForCheckType = {
  taskcount: number;
};

export type CourseBarChart = {
  label: string;
  id: number;
};

export type ItemsBarChart = {
  [key: string]: number | string;
};

export type GroupBarChart = {
  label: string;
  courses: CourseBarChart[];
  items: ItemsBarChart[];
};

export type DBstudentsGradeAllocationTypes = {
  [groupId: number]: GroupBarChart;
};

export type DBgroupsAverageScoresTypes = {
  courses: CourseBarChart[];
  items: ItemsBarChart[];
};

export type DashboardConsolidationTeacher = {
  dbTaskStatusByGroup: DBtaskStatusByGroupDataTypes;
  dbTaskForCheck: DBTaskForCheckType;
  dbStudentsGradeAllocation: DBstudentsGradeAllocationTypes;
  dbGroupsAverageScores: DBgroupsAverageScoresTypes;
};

type TeacherDataForStudentDashboard = {
  first_name: string;
  last_name: string;
  course_title: string;
};
