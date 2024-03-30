import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { MdFirstPage, MdLastPage } from "react-icons/md";
import { useState } from "react";
import data from "@/Datos/MOCK_DATA.json";
import { useAuth } from "@/contexts/AuthContext/useAuth";

function DataTable() {
  const { usuario } = useAuth();
  const columnas = [
    {
      header: "Matricula",
      accessorKey: "matricula",
    },
    {
      header: "Nombre",
      accessorKey: "nombre", 
    },
    {
      header: "Correo",
      accessorKey: "correo", 
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
        <thead className=" dark:bg-slate-900 border-gray-300 dark:border-slate-900">
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
                <td key={cell.id} className="py-1 px-1">
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
          Página {table.options.state.pagination.pageIndex + 1} de{" "}
          {Math.max(1, table.getPageCount())}
        </span>
        <button
          onClick={() => {
            if (
              table.options.state.pagination.pageIndex <
              table.getPageCount() - 1
            ) {
              table.nextPage();
            }
          }}
          className="pagination-button"
          disabled={
            table.options.state.pagination.pageIndex ===
            table.getPageCount() - 1
          }
        >
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











// pendiente de backend para obtener los datos de los usuarios, tengo que poner muchos datos en los usuarios para que se vea bien

// import React, { useState, useEffect } from "react";
// import { back_url } from "@/config/const";
// import { useAuth } from "@/contexts/AuthContext/useAuth";
// import {
//   useReactTable,
//   getCoreRowModel,
//   flexRender,
//   getPaginationRowModel,
//   getSortedRowModel,
//   getFilteredRowModel,
// } from "@tanstack/react-table";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
// import { MdFirstPage, MdLastPage } from "react-icons/md";

// function DataTable() {
//   const { usuario } = useAuth();
//   const [usuarios, setUsuarios] = useState([]);
//   const [sorting, setSorting] = useState([]);
//   const [filter, setFilter] = useState("");


//   useEffect(() => {
//     const fetchUsuarios = async () => {
//       try {
//         const response = await fetch(`${back_url}/usuarios`, {
//           headers: {
//             Authorization: `Bearer ${usuario.token}`,
//           },
//         });
//         if (response.ok) {
//           const usuariosData = await response.json();
//           setUsuarios(usuariosData);
//         } else {
//           console.error("Error al obtener los datos de usuarios");
//         }
//       } catch (error) {
//         console.error("Error en la petición fetch para obtener los datos de usuarios", error);
//       }
//     };

//     if (usuario) {
//       fetchUsuarios();
//     }
//   }, []);

//   const columnas = [
//     {
//       header: "Matricula",
//       accessorKey: "matricula",
//     },
//     {
//       header: "Nombre",
//       accessorKey: "nombre", 
//     },
//     {
//       header: "Correo",
//       accessorKey: "correo", 
//       footer: "mi correo",
//     },
//     {
//       header: "Rol",
//       accessorKey: "rol",
//       footer: "mi rol",
//     },
//   ];

//   const table = useReactTable({
//     data: usuarios,
//     columns: columnas,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     state: {
//       sorting,
//       globalFilter: filter,
//     },
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setFilter,
//   });

//   return (
//     <div className="w-3/4 p-4  bg-white dark:bg-slate-900 dark:border border-gray-200 dark:border-gray-200 rounded-md shadow-lg">
//       {" "}
//       {/* Aplicar el fondo, sombra, ancho y relleno a toda la sección */}
//       <div className="form">
//         <input
//           className="dark:text-slate-200 dark:bg-slate-900 dark:placeholder-slate-400 border border-gray-400 p-2 rounded-md flex-grow"
//           placeholder="Buscar"
//           type="text"
//           value={filter}
//           onChange={(e) => setFilter(e.target.value)}
//         />
//       </div>
//       <table className=" m-6 mx-auto w-full">
//         <thead className=" dark:bg-slate-900 border-gray-300 dark:border-slate-900">
//           {table.getHeaderGroups().map((headerGroup) => (
//             <tr key={headerGroup.id}>
//               {headerGroup.headers.map((header) => (
//                 <th
//                   key={header.id}
//                   onClick={() => header.column.getToggleSort()}
//                 >
//                   {header.isPlaceholder ? null : (
//                     <div>
//                       {flexRender(
//                         header.column.columnDef.header,
//                         header.getContext()
//                       )}
//                     </div>
//                   )}
//                 </th>
//               ))}
//             </tr>
//           ))}
//         </thead>

//         <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
//           {table.getRowModel().rows.map((row) => (
//             <tr
//               key={row.id}
//               className="hover:bg-gray-100 dark:hover:bg-slate-800"
//             >
//               {row.getVisibleCells().map((cell) => (
//                 <td key={cell.id} className="py-1 px-1">
//                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="mt-3 flex items-center space-x-2">
//         <button
//           onClick={() => table.setPageIndex(0)}
//           className="pagination-button"
//         >
//           <MdFirstPage className="pagination-icon" />
//         </button>
//         <button
//           onClick={() => table.previousPage()}
//           className="pagination-button"
//         >
//           <FaArrowLeft className="pagination-icon" />
//         </button>
//         <span className="text-gray-600 dark:text-slate-200">
//           Página {table.options.state.pagination.pageIndex + 1} de{" "}
//           {Math.max(1, table.getPageCount())}
//         </span>
//         <button
//           onClick={() => {
//             if (
//               table.options.state.pagination.pageIndex <
//               table.getPageCount() - 1
//             ) {
//               table.nextPage();
//             }
//           }}
//           className="pagination-button"
//           disabled={
//             table.options.state.pagination.pageIndex ===
//             table.getPageCount() - 1
//           }
//         >
//           <FaArrowRight className="pagination-icon" />
//         </button>
//         <button
//           onClick={() =>
//             table.setPageIndex(Math.max(0, table.getPageCount() - 1))
//           }
//           className="pagination-button"
//         >
//           <MdLastPage className="pagination-icon" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export { DataTable };
