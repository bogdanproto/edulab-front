export type Course = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  yearCourse: string;
  isActive: boolean;
};

export type Lesson = {
  id: number;
  title: string;
  description: string;
  orderNumber: number;
  courseId: number;
};

export type LessonId = {
  lessonId: number;
  courseId: number;
};

export type Material = {
  id: number;
  title: string;
  sourceUrl: string;
  lessonId: number;
};

export type LessonEntityId = {
  id: number;
  lessonId: number;
  courseId: number;
};

export type Homework = {
  id: number;
  title: string;
  sourceUrl: string;
  lessonId: number;
};

export type CourseWLessons = Omit<Course, 'teacherId'> & {
  lessons: Lesson[];
};
export type CourseTeacher = Omit<Course, 'teacherId'>;
export type CourseCreate = Omit<Course, 'id' | 'imgUrl'> & {
  file: File | null;
};
export type CourseUpdate = Omit<Course, 'imgUrl'> & {
  file: File | string | null;
};

export type LessonCreate = Omit<Lesson, 'id'>;
export type LessonDelete = Omit<
  Lesson,
  'title' | 'description' | 'orderNumber'
>;

export type MaterialFormCreate = Omit<Material, 'id' | 'lessonId'>;

export type MaterialCreate = Omit<Material, 'id' | 'sourceUrl'> & {
  courseId: number;
  file: File;
};

export type HomeworkCreate = Omit<Homework, 'id' | 'sourceUrl'> & {
  courseId: number;
  file: File;
};

export type assignTestToLesson = LessonId & {
  testId: number;
};

//derived types student
export type CourseStudent = Omit<Course, 'teacherId | status'>;

export type TypeLessonFiles = 'materials' | 'homeworks' | 'test';
