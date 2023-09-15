import classNames from "classnames";
import { memo, useMemo, useState } from "react";
import { FaTrashCan, FaPen, FaEye, FaXmark } from "react-icons/fa6";

import Table from "@/components/Table";
import QuestionForm from "@/components/Forms/QuestionForm";
import useBoolean from "@/hooks/useBoolean";

import { DIALOG_LABELS, STATUS, STATUS_LABEL } from "@/constants";
import Dialog from "@/components/Dialog";

const INITIAL_FORM_DATA = Object.freeze({
  isDisabled: false,
  formData: null,
});

function QuestionTable({ data }) {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const { bool: isOpen, setFalse, setTrue } = useBoolean(false);
  const [dialogHeader, setDialogHeader] = useState(null);

  const columns = useMemo(() => {
    return [
      { header: "Subject", accessorKey: "subject" },
      { header: "Year Level", accessorKey: "level" },
      { header: "Difficulty", accessorKey: "difficulty" },
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
                setFormData({ isDisabled: true, data: info.row.original });
                setDialogHeader(DIALOG_LABELS.QUESTION_VIEW);
                setTrue();
              }}
            >
              <FaEye />
            </button>
            <button
              className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400"
              onClick={() => {
                setFormData({ isDisabled: false, data: info.row.original });
                setDialogHeader(DIALOG_LABELS.QUESTION_UPDATE);
                setTrue();
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
      <Dialog header={dialogHeader} isOpen={isOpen} setFalse={setFalse} content={<QuestionForm {...formData} />} />
      <Table data={data} columns={columns} />
    </>
  );
}

export default memo(QuestionTable);
