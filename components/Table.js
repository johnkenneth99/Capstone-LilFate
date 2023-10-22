import classNames from "classnames";
import { useReactTable, flexRender, getCoreRowModel } from "@tanstack/react-table";
import { useEffect } from "react";

export default function Table({ data = [], columns = [], columnVisibility = {} }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableHiding: true,
    state: { columnVisibility },
  });

  return (
    <section className="flex flex-row justify-center items-center">
      <table className="border text-lg text-slate-600 w-full shadow-lg">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className="border p-4 bg-slate-600 text-white font-medium sticky top-[-1px]" key={header.id}>
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
