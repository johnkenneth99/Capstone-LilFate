import React, { Fragment } from "react";
import TextAreaField from "@/components/TextAreaField";
import Dropdown from "@/components/Dropdown";
import InputField from "@/components/InputField";
import { Formik, Form } from "formik";
import { QUESTION_VALIDATION_SCHEMA } from "@/schemas/QuestionValidationSchema";
import { PrimaryButton } from "../Buttons";

const SUBJECTS = Object.freeze([{ label: "Math" }, { label: "Science" }, { label: "English" }]);
const YEAR_LEVELS = Object.freeze([{ label: "1" }, { label: "2" }, { label: "3" }]);
const DIFFICULTIES = Object.freeze([{ label: "Easy" }, { label: "Medium" }, { label: "Hard" }]);

const INITIAL_VALUES = Object.freeze({
  answer: null,
  question: null,
  subject: null,
  option_1: null,
  option_2: null,
  option_3: null,
  option_4: null,
  year_level: null,
  difficulty: null,
});

export default function QuestionForm() {
  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        validationSchema={QUESTION_VALIDATION_SCHEMA}
        validateOnBlur={false}
        validateOnChange
        validateOnMount
        enableReinitialize
      >
        {({ submitForm }) => (
          <Form>
            <section className="grid grid-rows-5 grid-cols-2 gap-0 p-5">
              <div className="grid grid-cols-3 gap-3 col-span-2">
                <Dropdown label="Subject" options={SUBJECTS} />
                <Dropdown label="Year Level" options={YEAR_LEVELS} />
                <Dropdown label="Difficulty" options={DIFFICULTIES} />
              </div>
              <div className="row-span-2 grid gap-3 col-span-2">
                <TextAreaField label="Question" rows={4} name="question" />
              </div>
              <div className="grid grid-cols-2 gap-3 col-span-2">
                <InputField label="Option 1" name="option_1" />
                <InputField label="Option 2" name="option_2" />
              </div>
              <div className="grid grid-cols-2 gap-3 col-span-2">
                <InputField label="Option 3" name="option_3" />
                <InputField label="Option 4" name="option_4" />
              </div>
              <div className="col-span-2">
                <InputField type="text" label="Answer" name="answer" />
              </div>
              <div className="flex justify-end col-span-2 mt-5">
                <PrimaryButton label="Create" onClick={() => submitForm()} />
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </>
  );
}
