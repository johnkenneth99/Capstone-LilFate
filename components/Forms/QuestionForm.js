import React, { Fragment, memo, useEffect, useState } from "react";
import TextAreaField from "@/components/TextAreaField";
import Dropdown from "@/components/Dropdown";
import InputField from "@/components/InputField";
import { Formik, Form } from "formik";
import { QUESTION_VALIDATION_SCHEMA } from "@/schemas/QuestionValidationSchema";
import { PrimaryButton } from "../Buttons";
import { ACTION_TYPE, DROP_DOWN_OPTIONS } from "@/constants";

const INITIAL_VALUES = Object.freeze({
  answer: "",
  question: "",
  subject: "",
  option_1: "",
  option_2: "",
  option_3: "",
  option_4: "",
  year_level: "",
  difficulty: "",
  action_type: ACTION_TYPE.CREATE,
});

function QuestionForm({ isDisabled = false, data = null, formikRef = null, handleSubmit = null, isNew = false }) {
  const [isDataReady, setIsDataReady] = useState(false);
  const [initialValues, setInitialValues] = useState(INITIAL_VALUES);

  useEffect(() => {
    if (data) {
      setInitialValues((currentValues) => ({ ...currentValues, ...data }));
    }

    setIsDataReady(true);
  }, [data]);

  return (
    <Formik
      innerRef={formikRef}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={QUESTION_VALIDATION_SCHEMA}
      validateOnBlur
      validateOnChange
      validateOnMount
      enableReinitialize
    >
      {() => (
        <Form>
          {isDataReady && (
            <section className="grid grid-rows-5 grid-cols-2 gap-0 p-5">
              <div className="grid grid-cols-3 gap-3 col-span-2">
                <Dropdown label="Subject" name="subject" options={DROP_DOWN_OPTIONS.SUBJECT} disabled={isDisabled} />
                <Dropdown label="Year Level" name="level" options={DROP_DOWN_OPTIONS.YEAR_LEVEL} disabled={isDisabled} />
                <Dropdown label="Difficulty" name="difficulty" options={DROP_DOWN_OPTIONS.DIFFICULTY} disabled={isDisabled} />
              </div>
              <div className="row-span-2 grid gap-3 col-span-2">
                <TextAreaField label="Question" rows={4} name="question" disabled={isDisabled} />
              </div>
              <div className="grid grid-cols-2 gap-3 col-span-2">
                <InputField label="Option 1" name="option_1" disabled={isDisabled} />
                <InputField label="Option 2" name="option_2" disabled={isDisabled} />
              </div>
              <div className="grid grid-cols-2 gap-3 col-span-2">
                <InputField label="Option 3" name="option_3" disabled={isDisabled} />
                <InputField label="Option 4" name="option_4" disabled={isDisabled} />
              </div>
              <div className="col-span-2">
                <InputField type="text" label="Answer" name="answer" disabled={isDisabled} />
              </div>
              {!isDisabled && (
                <div className="flex justify-end col-span-2 mt-5">
                  <PrimaryButton label={isNew ? "Create" : "Update"} type="submit" />
                </div>
              )}
            </section>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default memo(QuestionForm);
