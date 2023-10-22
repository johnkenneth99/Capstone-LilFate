export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyD7DpxChvqgK8IiOu3H3wrvIK4WJUdXLYM",
  authDomain: "lil-fate-project.firebaseapp.com",
  projectId: "lil-fate-project",
  storageBucket: "lil-fate-project.appspot.com",
  messagingSenderId: "835500208636",
  appId: "1:835500208636:web:3ec25e923ce9d39cc5c279",
  measurementId: "G-QE09ZCRT1F",
};

export const DIALOG_LABELS = {
  QUESTION_VIEW: "View Question",
  QUESTION_UPDATE: "Update Question",
  QUESTION_ADD: "New Question",
};

export const STATUS = {
  REJECTED: "rejected",
  APPROVED: "approved",
  PENDING: "pending",
};

export const STATUS_LABEL = {
  0: "rejected",
  1: "approved",
  2: "pending",
};

export const COLLECTION = {
  QUESTIONS: "questions",
  USERS: "users",
};

export const ACTIONS = {
  SUCCESS: 0,
  ERROR: 1,
};

export const ACTION_TYPE = {
  SEARCH: 0,
  CREATE: 1,
  UPDATE: 2,
  DELETE: 3,
};

export const PAGES = {
  QUESTION: "questions",
  LOGIN: "/",
};

export const DROP_DOWN_OPTIONS = {
  YEAR_LEVEL: [
    { value: "", label: "Select year level", isHidden: true },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ],
  DIFFICULTY: [
    { value: "", label: "Select difficulty", isHidden: true },
    { value: "Easy", label: "Easy" },
    { value: "Medium", label: "Medium" },
    { value: "Hard", label: "Hard" },
  ],
  SUBJECT: [
    { value: "", label: "Select subject", isHidden: true },
    { value: "Math", label: "Math" },
    { value: "Science", label: "Science" },
    { value: "English", label: "English" },
  ],
  STATUS: [
    { value: "", label: "Select status", isHidden: true },
    { value: "rejected", label: "Rejected" },
    { value: "approved", label: "Approved" },
    { value: "pending", label: "Pending" },
  ],
  LIMIT: [
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ],
};
