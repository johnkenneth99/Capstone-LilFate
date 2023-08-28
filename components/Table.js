import useFireStore from "@/hooks/useFireStore";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, doc, limit, query } from "firebase/firestore";
import classNames from "classnames";
import { FaTrashCan, FaPen, FaEye } from "react-icons/fa6";

export default function Table() {
  const { db } = useFireStore();
  const [data, setData] = useState([]);

  const columns = [
    { header: "Subject", accessorKey: "subject", style: "w-12" },
    { header: "Year Level", accessorKey: "level", style: "w-12" },
    { header: "Difficulty", accessorKey: "difficulty", style: "w-12" },
    { header: "Question", accessorKey: "question" },
    {
      header: "Actions",
      cell: () => (
        <div className="flex items-center justify-center gap-5">
          <button className="text-white bg-slate-600 rounded p-3 hover:bg-slate-400">
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

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  useEffect(() => {
    if (db === null) return;

    (async () => {
      const result = [];

      const payload = query(collection(db, "questions"), limit(15));
      const snapshot = await getDocs(payload);

      snapshot.forEach((doc) => result.push(doc.data()));

      setData(result);
      console.log(result);
    })();
  }, [db]);

  return (
    <section className="flex flex-row justify-center items-center">
      <table className="border text-lg text-slate-600 w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="border p-4 bg-slate-500 text-white font-medium" key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr className="hover:bg-slate-300" key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td className={classNames("text-center border p-1")} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </section>
  );
}
