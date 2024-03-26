import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext/useAuth";
function TrabajadorDes() {
  const { usuario } = useAuth();
  const [correo, setCorreo] = useState('');
  const [nombre, setNombre] = useState('');
  
  useEffect(() => {
    getTrabajador();
  }, []); 

  const getTrabajador = async () => {
    setCorreo('ErickCastro@gmail.com');
    setNombre('Erick Castro');
  }

  return (
    <div className="flex flex-col items-center justify-center w-full dark:border-gray-200 sm:w-1/2 md:w-1/3 lg:w-1/4 p-4 dark:bg-slate-900 bg-white dark:border rounded-md shadow-lg text-center">
      <h2 className="text-xl">Trabajador destacado</h2>
      <div className="flex items-center justify-center mt-4 mb-5">
        <img
          className="cursor-pointer rounded-full w-20 h-20 sm:w-16 sm:h-16 lg:w-20 lg:h-20 xl:w-32 xl:h-32"
          src="https://github.com/shadcn.png"
          alt=""
        />
      </div> 
      <p className="text-gray-600 dark:text-slate-200">{nombre}</p>
      <p className="text-gray-600 dark:text-slate-200">{correo}</p>
    </div>
  );
  
}

export { TrabajadorDes };
