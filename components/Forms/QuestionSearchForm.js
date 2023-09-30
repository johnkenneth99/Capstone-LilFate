import { memo, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import Dropdown from "@/components/Dropdown";
import { PrimaryButton } from "@/components/Buttons";
import { Form, Formik } from "formik";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { DROP_DOWN_OPTIONS, DIALOG_LABELS } from "@/constants";
import QuestionDialog from "@/components/Dialogs/QuestionDialog";

const DROP_DOWN_FIELDS = [
  { name: "subject", label: "Subject", options: DROP_DOWN_OPTIONS.SUBJECT },
  { name: "year_level", label: "Year Level", options: DROP_DOWN_OPTIONS.YEAR_LEVEL },
  { name: "difficulty", label: "Difficulty", options: DROP_DOWN_OPTIONS.DIFFICULTY },
  { name: "status", label: "Status", options: DROP_DOWN_OPTIONS.STATUS },
];

const INITIAL_VALUE = {
  status: null,
  subject: null,
  year_level: null,
  difficulty: null,
};
// TODO: Create validation schema for search form
export default function QuestionSearchForm({ handleSubmit, ...props }) {
  const dialogRef = useRef(null);

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUE}
        validateOnBlur={false}
        validateOnChange
        validateOnMount
        enableReinitialize
        {...props}
      >
        {() => (
          <Form>
            <div className="grid grid-cols-8 my-5 gap-5">
              {DROP_DOWN_FIELDS.map((item, index) => (
                <div className="col-span-1" key={index}>
                  <Dropdown {...item} />
                </div>
              ))}
              <div className="flex justify-end items-end col-span-2 col-end-9 gap-5 ">
                <PrimaryButton icon={<FaMagnifyingGlass />} label="Search" type="submit" />
                <PrimaryButton label="Question" icon={<FaPlus />} onClick={() => dialogRef.current.showModal()} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <QuestionDialog header={DIALOG_LABELS.QUESTION_ADD} dialogRef={dialogRef} isNew />
    </>
  );
}
