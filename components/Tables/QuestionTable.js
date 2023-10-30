import classNames from "classnames";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { FaCheck, FaEye, FaPen, FaTrashCan, FaX } from "react-icons/fa6";

import Table from "@/components/Table";

import ApproveDialogContent from "@/components/DialogContents/ApproveDialogContent";
import RejectDialogContent from "@/components/DialogContents/RejectDialogContent";
import Dialog from "@/components/Dialogs/Dialog";
import QuestionDialog from "@/components/Dialogs/QuestionDialog";
import { ACTION_TYPE, COLLECTION, DIALOG_LABELS, STATUS } from "@/constants";
import { titleCase } from "@/functions/helpers";
import useCollection from "@/hooks/useCollection";
import useFireStore from "@/hooks/useFireStore";

const INITIAL_DIALOG_DATA = Object.freeze({
  data: null,
  header: null,
  isDisabled: false,
});

const INITIAL_CONFIRMATION_PARAMS = Object.freeze({
  id: null,
  uid: null,
});

/**
 * @param {array} data
 *
 * @param {function} handleSubmit
 *
 * @returns {React.Component}
 */

const QuestionTable = ({ data, handleSubmit }) => {
  const {
    auth: { currentUser },
  } = useFireStore();

  const { updateDocument } = useCollection(COLLECTION.QUESTIONS);

  const dialogRef = useRef(null);

  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [dialogData, setDialogData] = useState(INITIAL_DIALOG_DATA);
  const [confirmationParams, setConfirmationParams] = useState(INITIAL_CONFIRMATION_PARAMS);

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
            row: {
              original: { status, created_by, id },
            },
          } = info;

          const { uid } = currentUser;

          const isUpdatable = created_by === uid && status !== STATUS.REJECTED;

          return (
            <div className="flex items-center justify-center gap-5">
              {status === STATUS.PENDING ? (
                <Fragment>
                  <button
                    className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400"
                    onClick={() => {
                      setIsApproveDialogOpen(true);
                      setConfirmationParams({ isApproved: true, id, uid });
                    }}
                  >
                    <FaCheck />
                  </button>
                  <button
                    className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400"
                    onClick={() => {
                      setIsRejectDialogOpen(true);
                      setConfirmationParams({ isApproved: false, id, uid });
                    }}
                  >
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
                  {isUpdatable && (
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

  const handleStatusUpdate = ({ isApproved, id, uid }) => {
    const params = {
      id,
      updated_by: uid,
      status: isApproved ? STATUS.APPROVED : STATUS.REJECTED,
    };

    setIsProcessing(true);
    updateDocument(params);
  };

  return (
    <>
      <QuestionDialog dialogRef={dialogRef} {...dialogData} />

      <Table data={data} columns={columns} columnVisibility={columnVisibility} />

      <Dialog isOpen={isApproveDialogOpen} hasHeader={false}>
        <ApproveDialogContent
          isProcessing={isProcessing}
          setIsDialogOpen={setIsApproveDialogOpen}
          onSubmit={() => handleStatusUpdate(confirmationParams)}
        />
      </Dialog>

      <Dialog isOpen={isRejectDialogOpen} hasHeader={false}>
        <RejectDialogContent
          isProcessing={isProcessing}
          setIsDialogOpen={setIsRejectDialogOpen}
          onSubmit={() => handleStatusUpdate(confirmationParams)}
        />
      </Dialog>
    </>
  );
};

QuestionTable.defaultProps = {
  data: [],
  handleSubmit: () => {},
};

export default QuestionTable;
