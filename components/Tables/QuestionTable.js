import classNames from "classnames";
import { memo, useMemo, useRef, useState } from "react";
import { FaEye, FaPen, FaTrashCan } from "react-icons/fa6";

import Table from "@/components/Table";

import QuestionDialog from "@/components/Dialogs/QuestionDialog";
import { DIALOG_LABELS, STATUS, STATUS_LABEL } from "@/constants";
import { titleCase } from "@/functions/helpers";

const INITIAL_FORM_DATA = Object.freeze({
  isDisabled: false,
  formData: null,
});

const INITIAL_DIALOG_DATA = Object.freeze({
  isDisabled: false,
  data: null,
  header: null,
});

function QuestionTable({ data }) {
  const dialogRef = useRef(null);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [dialogData, setDialogData] = useState(INITIAL_DIALOG_DATA);
  const [dialogHeader, setDialogHeader] = useState(null);

  const columns = useMemo(() => {
    return [
      { header: "Subject", accessorKey: "subject", cell: ({ getValue }) => <>{titleCase(getValue())}</> },
      { header: "Year Level", accessorKey: "year_level" },
      { header: "Difficulty", accessorKey: "difficulty", cell: ({ getValue }) => <>{titleCase(getValue())}</> },
      { header: "Question", accessorKey: "question" },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ getValue }) => (
          <div className="flex justify-center items-center">
            <p
              className={classNames(
                "p-1",
                "rounded",
                "min-w-[6rem]",
                "text-white",
                { "bg-green-500": getValue() === STATUS.APPROVED },
                { "bg-red-500": getValue() === STATUS.REJECTED },
                { "bg-yellow-500": getValue() === STATUS.PENDING }
              )}
            >
              {STATUS_LABEL[getValue()]}
            </p>
          </div>
        ),
      },
      {
        header: "Actions",
        cell: (info) => (
          <div className="flex items-center justify-center gap-5">
            <button
              className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400"
              onClick={() => {
                setDialogData({ isDisabled: true, data: info.row.original, header: DIALOG_LABELS.QUESTION_VIEW });

                dialogRef.current.showModal();
              }}
            >
              <FaEye />
            </button>
            <button
              className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400"
              onClick={() => {
                setDialogData({ isDisabled: false, data: info.row.original, header: DIALOG_LABELS.QUESTION_UPDATE });

                dialogRef.current.showModal();
              }}
            >
              <FaPen />
            </button>
            <button className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400">
              <FaTrashCan />
            </button>
          </div>
        ),
      },
    ];
  }, []);

  return (
    <>
      <QuestionDialog dialogRef={dialogRef} {...dialogData} />
      <Table data={data} columns={columns} />
    </>
  );
}

export default memo(QuestionTable);
