import { memo, useRef } from "react";
import { FaPlus, FaXmark } from "react-icons/fa6";
import Dropdown from "@/components/Dropdown";
import { PrimaryButton } from "@/components/Buttons";
import { Form, Formik } from "formik";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { DROP_DOWN_OPTIONS, DIALOG_LABELS, ACTION_TYPE } from "@/constants";
import QuestionDialog from "@/components/Dialogs/QuestionDialog";

const DROP_DOWN_FIELDS = [
  { name: "subject", label: "Subject", options: DROP_DOWN_OPTIONS.SUBJECT },
  { name: "year_level", label: "Year Level", options: DROP_DOWN_OPTIONS.YEAR_LEVEL },
  { name: "difficulty", label: "Difficulty", options: DROP_DOWN_OPTIONS.DIFFICULTY },
  { name: "status", label: "Status", options: DROP_DOWN_OPTIONS.STATUS },
];

const INITIAL_VALUE = {
  status: "",
  subject: "",
  year_level: "",
  difficulty: "",
  action_type: ACTION_TYPE.SEARCH,
};

export default function QuestionSearchForm({ handleSubmit, ...props }) {
  const dialogRef = useRef(null);

  const handleDialogOpen = ({ setFieldValue }) => {
    dialogRef.current.showModal();
    setFieldValue("action_type", ACTION_TYPE.CREATE);
  };

  const handleOnSubmit = ({ setFieldValue, handleSubmit: handleFormSubmit }) => {
    handleFormSubmit();
    setFieldValue("action_type", ACTION_TYPE.SEARCH);
  };

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
        {({ handleReset, ...formikBag }) => (
          <Form>
            <div className="grid grid-cols-8 my-5 gap-5">
              {DROP_DOWN_FIELDS.map((item, index) => (
                <div className="col-span-1" key={index}>
                  <Dropdown {...item} />
                </div>
              ))}
              <div className="flex justify-end items-end col-span-2 col-end-9 gap-5 ">
                <PrimaryButton type="button" label="Clear" icon={<FaXmark />} onClick={() => handleReset()} />
                <PrimaryButton type="button" label="Search" icon={<FaMagnifyingGlass />} onClick={() => handleOnSubmit(formikBag)} />
                <PrimaryButton type="button" label="Question" icon={<FaPlus />} onClick={() => handleDialogOpen(formikBag)} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <QuestionDialog header={DIALOG_LABELS.QUESTION_ADD} dialogRef={dialogRef} handleSubmit={handleSubmit} isNew />
    </>
  );
}
