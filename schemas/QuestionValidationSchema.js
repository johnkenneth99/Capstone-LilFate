import * as Yup from "yup";
import { getMessage } from "@/functions/helpers";

export const QUESTION_VALIDATION_SCHEMA = Yup.object().shape({
  answer: Yup.string().nullable().required(getMessage("V001")),
  question: Yup.string().nullable().required(getMessage("V002")),
  option_1: Yup.string().nullable().required(getMessage("V003")),
  option_2: Yup.string().nullable().required(getMessage("V004")),
  option_3: Yup.string().nullable().required(getMessage("V005")),
  option_4: Yup.string().nullable().required(getMessage("V006")),
});
