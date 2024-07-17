export enum NotificationStatus {
  VIEWED = 'viewed',
  NOT_VIEWED = 'notviewed',
}

export enum NotificationTypes {
  STUDENT_HW_DONE = 'studentHWdone',
  TEACHER_HW_CHECKED = 'teacherHWchecked',
  STUDENT_GET_COURSE = 'studentGetCourse',
}

export enum Init {
  TRUE = 'true',
  FALSE = 'false',
}

export type Notification = {
  id: number;
  status: NotificationStatus;
  type: NotificationTypes;
  date: string;
  message: string;
};

export type NotificationRes = {
  total: number;
  rest: number;
  init: Init;
  items: Notification[];
};

export type NotificationReq = {
  cursor: number | null;
  init: Init;
};

export type NotificationStatusRes = {
  total: number;
  status: NotificationStatus;
  cursor: number;
};

export type NotificationStatusReq = {
  status: NotificationStatus;
};
