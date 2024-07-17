export type ItemSelect = {
  label: string;
  id: number;
};

export type GroupSelect = {
  label: string;
  id: number;
  courses: CourseSelect[];
};
