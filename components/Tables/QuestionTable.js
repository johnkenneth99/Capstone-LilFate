import classNames from "classnames";
import { memo, useMemo, useRef, useState, useEffect, Fragment } from "react";
import { FaCheck, FaEye, FaPen, FaTrashCan, FaX } from "react-icons/fa6";

import Table from "@/components/Table";

import QuestionDialog from "@/components/Dialogs/QuestionDialog";
import { ACTION_TYPE, DIALOG_LABELS, STATUS } from "@/constants";
import { titleCase } from "@/functions/helpers";
import useFireStore from "@/hooks/useFireStore";

const INITIAL_DIALOG_DATA = Object.freeze({
  data: null,
  header: null,
  isDisabled: false,
});

function QuestionTable({ data = [], handleSubmit = null }) {
  const {
    auth: { currentUser },
  } = useFireStore();

  const dialogRef = useRef(null);

  const [columnVisibility, setColumnVisibility] = useState({});
  const [dialogData, setDialogData] = useState(INITIAL_DIALOG_DATA);

  useEffect(() => {
    (async () => {
      const {
        claims: { admin = null },
      } = await currentUser.getIdTokenResult();

      setColumnVisibility({ ...(!admin && { status: false }) });
    })();
  }, []);

  const columns = useMemo(() => {
    return [
      { header: "Subject", accessorKey: "subject", cell: ({ getValue }) => <>{getValue() && titleCase(getValue())}</> },
      { header: "Year Level", accessorKey: "level" },
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
              {getValue()}
            </p>
          </div>
        ),
      },
      {
        header: "Actions",
        cell: (info) => {
          const {
            row: { original },
          } = info;

          const { status, created_by } = original;
          return (
            <div className="flex items-center justify-center gap-5">
              {status === STATUS.PENDING ? (
                <Fragment>
                  <button className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400" onClick={() => console.log("clicked")}>
                    <FaCheck />
                  </button>
                  <button className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400" onClick={() => console.log("clicked")}>
                    <FaX />
                  </button>
                </Fragment>
              ) : (
                <Fragment>
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
                  {created_by === currentUser?.uid && (
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
                  )}
                  <button
                    className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400"
                    onClick={() => handleSubmit({ action_type: ACTION_TYPE.DELETE, id: info.row.original.id })}
                  >
                    <FaTrashCan />
                  </button>
                </Fragment>
              )}
            </div>
          );
        },
      },
    ];
  }, []);

  return (
    <>
      <QuestionDialog dialogRef={dialogRef} {...dialogData} />
      <Table data={data} columns={columns} columnVisibility={columnVisibility} />
    </>
  );
}

export default memo(QuestionTable);
