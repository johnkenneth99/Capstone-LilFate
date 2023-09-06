import * as Yup from "yup";

export const QUESTION_VALIDATION_SCHEMA = Yup.object().shape({
  answer: Yup.string().nullable().required("Answer is required."),
});
