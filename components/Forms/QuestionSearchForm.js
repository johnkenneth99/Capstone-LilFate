import { PrimaryButton } from "@/components/Buttons";
import QuestionDialog from "@/components/Dialogs/QuestionDialog";
import Dropdown from "@/components/Dropdown";
import { ACTION_TYPE, DIALOG_LABELS, DROP_DOWN_OPTIONS } from "@/constants";
import { Form, Formik } from "formik";
import { Fragment, useRef } from "react";
import { FaMagnifyingGlass, FaPlus, FaXmark } from "react-icons/fa6";

const DROP_DOWN_FIELDS = Object.freeze([
  { name: "subject", label: "Subject", options: DROP_DOWN_OPTIONS.SUBJECT },
  { name: "level", label: "Year Level", options: DROP_DOWN_OPTIONS.YEAR_LEVEL },
  { name: "difficulty", label: "Difficulty", options: DROP_DOWN_OPTIONS.DIFFICULTY },
  { name: "status", label: "Status", options: DROP_DOWN_OPTIONS.STATUS },
  { name: "limit_count", label: "Limit", options: DROP_DOWN_OPTIONS.LIMIT },
]);

const INITIAL_VALUE = Object.freeze({
  status: "",
  subject: "",
  level: "",
  difficulty: "",
  action_type: ACTION_TYPE.SEARCH,
  limit_count: 10,
});

export default function QuestionSearchForm({ handleSubmit, ...props }) {
  const dialogRef = useRef(null);

  const handleDialogOpen = ({ setFieldValue }) => {
    dialogRef.current.showModal();
    setFieldValue("action_type", ACTION_TYPE.CREATE);
  };

  const handleOnSubmit = ({ setFieldValue, handleSubmit }) => {
    handleSubmit();
    setFieldValue("action_type", ACTION_TYPE.SEARCH);
  };

  return (
    <section className="shadow-md border sticky top-28 p-10 w-[20rem]">
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
            <div className="flex flex-col">
              {DROP_DOWN_FIELDS.map((item, index) => (
                <div className="" key={index}>
                  <Dropdown {...item} />
                </div>
              ))}
              <div className="flex flex-col mt-5 gap-3">
                <PrimaryButton type="button" label="Clear" icon={<FaXmark />} onClick={() => handleReset()} />
                <PrimaryButton type="button" label="Search" icon={<FaMagnifyingGlass />} onClick={() => handleOnSubmit(formikBag)} />
                <PrimaryButton type="button" label="Question" icon={<FaPlus />} onClick={() => handleDialogOpen(formikBag)} />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <QuestionDialog header={DIALOG_LABELS.QUESTION_ADD} dialogRef={dialogRef} handleSubmit={handleSubmit} isNew />
    </section>
  );
}
