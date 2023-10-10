import { MESSAGES } from "@/constants/validation";

export const getMessage = (code) => MESSAGES[code];

export const parseDocuments = ({ docs, empty }) => {
  return !empty ? docs.map((doc) => doc.data()) : [];
};

export const titleCase = (string) => {
  return string.charAt(0).toUpperCase().concat(string.substring(1));
};

export const isAllObjectValueEmpty = (obj) => {
  let count = 0;

  mainloop: for (const [_, value] of Object.entries(obj)) {
    if (Boolean(value)) {
      count += 1;
      break mainloop;
    }
  }

  return count === 0;
};
