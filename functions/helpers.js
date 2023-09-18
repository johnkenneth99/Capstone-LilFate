import { MESSAGES } from "@/constants/validation";

export const getMessage = (code) => MESSAGES[code];

export const parseDocuments = ({ docs, empty }) => {
  return !empty ? docs.map((doc) => doc.data()) : [];
};

export const titleCase = (string) => {
  return string.charAt(0).toUpperCase().concat(string.substring(1));
};
