interface INotifySubscription {
  [key: string]: {
    [key: string]: {
      loader: boolean;
      success: boolean | string;
      error: boolean | string;
    };
  };
}

export const notifySubscription: INotifySubscription = Object.freeze({
  coursesApi: {
    getCourses: { loader: true, success: false, error: true },
    getCoursesById: { loader: true, success: false, error: true },
    createCourse: { loader: true, success: true, error: true },
    updateCourse: { loader: true, success: true, error: true },
    deleteCourse: { loader: true, success: true, error: true },
  },

  lessonsApi: {
    getLessonsByCourseId: { loader: true, success: false, error: true },
    getTestByLessonId: { loader: true, success: false, error: true },
    assignTestToLesson: { loader: true, success: true, error: true },
    removeTestFromLesson: { loader: true, success: true, error: true },
    createLesson: { loader: true, success: true, error: true },
    updateLesson: { loader: true, success: true, error: true },
    deleteLesson: { loader: true, success: true, error: true },
  },

  materialsApi: {
    getMaterialsByLessonId: { loader: true, success: false, error: true },
    createMaterial: { loader: true, success: true, error: true },
    deleteMaterial: { loader: true, success: true, error: true },
  },

  homeworksApi: {
    getHomeworksByLessonId: { loader: true, success: false, error: true },
    createHomework: { loader: true, success: true, error: true },
    deleteHomework: { loader: true, success: true, error: true },
  },

  usersApi: {
    getUsers: { loader: true, success: false, error: true },
    addUser: { loader: true, success: true, error: true },
    updateUser: { loader: true, success: true, error: true },
    deleteUser: { loader: true, success: true, error: true },
  },

  groupsApi: {
    getGroupCourses: { loader: true, success: false, error: true },
    assignCourse: { loader: true, success: true, error: true },
    addGroup: { loader: true, success: true, error: true },
    updateGroup: { loader: true, success: true, error: true },
    deleteGroup: { loader: true, success: true, error: true },
  },

  testsApi: {
    getTests: { loader: true, success: false, error: true },
    getTestById: { loader: true, success: false, error: true },
    getTestByTaskId: { loader: true, success: false, error: true },
    createTest: { loader: true, success: true, error: true },
    updateTest: { loader: true, success: true, error: true },
    deleteTest: { loader: true, success: true, error: true },
    addQuestion: { loader: true, success: true, error: true },
    updateQuestion: { loader: true, success: true, error: true },
    deleteQuestion: { loader: true, success: true, error: true },
    getTestResultByTaskId: { loader: true, success: false, error: true },
    addTestResult: { loader: true, success: true, error: true },
  },

  tasksApi: {
    getTasksByUserId: { loader: true, success: false, error: true },
    getTaskById: { loader: true, success: false, error: true },
    getTaskForStudentById: { loader: true, success: false, error: true },
    createTasksForStudentFromGroup: {
      loader: true,
      success: true,
      error: true,
    },
    addTaskGrade: { loader: true, success: true, error: true },
    deleteTaskGrade: { loader: true, success: true, error: true },
    updateTaskGrade: { loader: true, success: true, error: true },
    sendHomework: { loader: false, success: true, error: true },
  },

  authApi: {
    register: { loader: false, success: false, error: true },
    importUsers: { loader: false, success: false, error: true },
    login: { loader: false, success: false, error: true },
    logout: { loader: false, success: false, error: true },
    restoreUser: { loader: false, success: false, error: false },
    refreshUser: { loader: false, success: false, error: false },
    changePassword: { loader: false, success: false, error: true },
    resetPassword: { loader: false, success: false, error: true },
    recoverCredentials: { loader: false, success: true, error: true },
    createPassword: { loader: false, success: false, error: true },
  },

  notificationsApi: {
    getNotifications: { loader: false, success: false, error: true },
  },
});
