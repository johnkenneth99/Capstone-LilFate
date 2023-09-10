import classNames from "classnames";
import Table from "@/components/Table";
import { memo, useMemo } from "react";
import { FaTrashCan, FaPen, FaEye } from "react-icons/fa6";
import { STATUS, STATUS_LABEL } from "@/constants";

function QuestionTable({ data }) {
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
        cell: () => (
          <div className="flex items-center justify-center gap-5">
            <button className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400" onClick={() => {}}>
              <FaEye />
            </button>
            <button className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400">
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
      <Table data={data} columns={columns} />
    </>
  );
}

export default memo(QuestionTable);
