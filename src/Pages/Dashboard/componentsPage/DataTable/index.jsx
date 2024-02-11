import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  FaSortAlphaDownAlt,
  FaSortAlphaUp,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { useState } from "react";
import data from "@/Datos/MOCK_DATA.json";
import dayjs from "dayjs";

function DataTable() {
  const columnas = [
    {
      header: "Matricula",
      accessorKey: "matricula",
    },
    {
      header: "Nombre",
      accessorKey: "nombre", // Cambiado de 'name' a 'nombre'
    },
    {
      header: "Correo",
      accessorKey: "correo", // Cambiado de 'email' a 'correo'
      footer: "mi correo",
    },
    {
      header: "Rol",
      accessorKey: "rol",
      footer: "mi rol",
    },
  ];

  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");

  const table = useReactTable({
    data,
    columns: columnas,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
  });

  return (
    <div className="w-3/4 p-4  bg-white dark:bg-slate-900 dark:border border-gray-200 dark:border-gray-200 rounded-md shadow-lg">
      {" "}
      {/* Aplicar el fondo, sombra, ancho y relleno a toda la sección */}
      <div className="form">
        <input
          className="dark:text-slate-200 dark:bg-slate-900 dark:placeholder-slate-400 border border-gray-400 p-2 rounded-md flex-grow"
          placeholder="Buscar"
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <table className=" m-6 mx-auto w-full">
        <thead className="bg-gray-100 dark:bg-slate-900 border-b border-gray-300 dark:border-slate-900">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={() => header.column.getToggleSort()}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-1 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex items-center space-x-2">
        <button
          onClick={() => table.setPageIndex(0)}
          className="pagination-button"
        >
          <MdFirstPage className="pagination-icon" />
        </button>
        <button
          onClick={() => table.previousPage()}
          className="pagination-button"
        >
          <FaArrowLeft className="pagination-icon" />
        </button>
        <span className="text-gray-600 dark:text-slate-200">
          Total de paginas: {Math.max(1, table.getPageCount())}
        </span>
        <button onClick={() => table.nextPage()} className="pagination-button">
          <FaArrowRight className="pagination-icon" />
        </button>
        <button
          onClick={() =>
            table.setPageIndex(Math.max(0, table.getPageCount() - 1))
          }
          className="pagination-button"
        >
          <MdLastPage className="pagination-icon" />
        </button>
      </div>
    </div>
  );
}

export { DataTable };
