import React, { Fragment } from "react";
import TextAreaField from "@/components/TextAreaField";
import Dropdown from "@/components/Dropdown";
import InputField from "@/components/InputField";

const SUBJECTS = Object.freeze([{ label: "Math" }, { label: "Science" }, { label: "English" }]);
const YEAR_LEVELS = Object.freeze([{ label: "1" }, { label: "2" }, { label: "3" }]);
const DIFFICULTIES = Object.freeze([{ label: "Easy" }, { label: "Medium" }, { label: "Hard" }]);

export default function QuestionForm() {
  return (
    <>
      <section className="grid grid-rows-4 grid-cols-2 gap-0 p-5">
        <div className="row-span-1 grid grid-cols-3 gap-3 col-span-2">
          <Dropdown label="Subject" options={SUBJECTS} />
          <Dropdown label="Year Level" options={YEAR_LEVELS} />
          <Dropdown label="Difficulty" options={DIFFICULTIES} />
        </div>
        <div className="row-span-2 grid gap-3 col-span-2">
          <TextAreaField label="Question" rows={4} resize="none" />
        </div>
        <div className="grid grid-cols-2 gap-3 col-span-2">
          <InputField label="Option 1" name="option1" />
          <InputField label="Option 2" name="option2" />
        </div>
        <div className="grid grid-cols-2 gap-3 col-span-2">
          <InputField label="Option 3" name="option3" />
          <InputField label="Option 4" name="option4" />
        </div>
        <div className="col-span-2">
          <InputField label="Answer" name="answer" />
        </div>
      </section>
    </>
  );
}
