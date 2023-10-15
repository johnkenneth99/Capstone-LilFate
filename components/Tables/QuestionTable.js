import classNames from "classnames";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaEye, FaPen, FaTrashCan } from "react-icons/fa6";

import Table from "@/components/Table";

import QuestionDialog from "@/components/Dialogs/QuestionDialog";
import { DIALOG_LABELS, STATUS, STATUS_LABEL, ACTION_TYPE } from "@/constants";
import { titleCase } from "@/functions/helpers";
import { PrimaryButton } from "../Buttons";

const INITIAL_DIALOG_DATA = Object.freeze({
  data: null,
  header: null,
  isDisabled: false,
});

function QuestionTable({ data = [], handleSubmit = null }) {
  const dialogRef = useRef(null);

  const [dialogData, setDialogData] = useState(INITIAL_DIALOG_DATA);

  const columns = useMemo(() => {
    return [
      { header: "Subject", accessorKey: "subject", cell: ({ getValue }) => <>{getValue() && titleCase(getValue())}</> },
      { header: "Year Level", accessorKey: "year_level" },
      { header: "Difficulty", accessorKey: "difficulty", cell: ({ getValue }) => <>{getValue() && titleCase(getValue())}</> },
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
                const data = { isDisabled: true, data: info.row.original, header: DIALOG_LABELS.QUESTION_VIEW };

                setDialogData(data);
                dialogRef.current.showModal();
              }}
            >
              <FaEye />
            </button>
            <button
              className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400"
              onClick={() => {
                const data = {
                  handleSubmit,
                  isDisabled: false,
                  header: DIALOG_LABELS.QUESTION_UPDATE,
                  data: { ...info.row.original, action_type: ACTION_TYPE.UPDATE },
                };

                setDialogData(data);
                dialogRef.current.showModal();
              }}
            >
              <FaPen />
            </button>
            <button
              className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400"
              onClick={() => handleSubmit({ action_type: ACTION_TYPE.DELETE, id: info.row.original.id })}
            >
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
