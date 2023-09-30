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
  REJECTED: 0,
  APPROVED: 1,
  PENDING: 2,
};

export const STATUS_LABEL = {
  0: "rejected",
  1: "approved",
  2: "pending",
};

export const COLLECTION = {
  QUESTIONS: "questions_updated",
  USERS: "users",
};

export const ACTIONS = {
  SUCCESS: 0,
  ERROR: 1,
};

export const DROP_DOWN_OPTIONS = {
  YEAR_LEVEL: [
    { value: "", label: "Select year level" },
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
  ],
  DIFFICULTY: [
    { value: "", label: "Select difficulty" },
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ],
  SUBJECT: [
    { value: "", label: "Select subject" },
    { value: "math", label: "Math" },
    { value: "science", label: "Science" },
    { value: "english", label: "English" },
  ],
  STATUS: [
    { value: "", label: "Select status" },
    { value: 0, label: "Rejected" },
    { value: 1, label: "Approved" },
    { value: 2, label: "Pending" },
  ],
};
