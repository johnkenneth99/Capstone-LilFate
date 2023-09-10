import { MESSAGES } from "@/constants/validation";

export const getMessage = (code) => MESSAGES[code];

export const parseDocuments = ({ docs, empty }) => {
  return !empty ? docs.map((doc) => doc.data()) : [];
};
