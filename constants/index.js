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
  QUESTION_VIEW: "Question Details",
  QUESTION_UPDATE: "Update Question Details",
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
  YEAR_LEVEL: [{ label: "1" }, { label: "2" }, { label: "3" }],
  DIFFICULTY: [{ label: "Easy" }, { label: "Medium" }, { label: "Hard" }],
  SUBJECT: [{ label: "Math" }, { label: "Science" }, { label: "English" }],
  STATUS: [
    { value: "approved", label: "Approved" },
    { value: "pending", label: "Pending" },
    { value: "reject", label: "Rejected" },
  ],
};
