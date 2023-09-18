import * as Yup from "yup";
import { getMessage } from "@/functions/helpers";

Yup.addMethod(Yup.object, "atLeastOneSelected", function (list) {
  return this.test({
    name: "atLeastOneSelected",
    message: getMessage("V007"),
    exclusive: true,
    test: (fields) => {
      console.log(list.some((field) => fields[field] !== null));
      fields === null || list.some((field) => fields[field] !== null);
      console.log(fields);
      console.log(list);
    },
  });
});

export const QUESTION_SEARCH_FORM_VALIDATION = Yup.object()
  .shape({
    status: Yup.string(),
    year_level: Yup.string(),
    difficulty: Yup.string(),
    subject: Yup.string(),
  })
  .atLeastOneSelected(["status", "year_level", "difficulty", "subject"])
  .required(getMessage("V007"));
