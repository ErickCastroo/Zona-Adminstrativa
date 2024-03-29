import React, { useState } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalCrearHistorias({ closeModal }) {

  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [descripcion, setDescripcion] = useState(" ");

  const alert = () => {
    Swal.fire({
      title: "Historia creada",
      text: "La historia ha sido creada exitosamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };
  
  const alertError = () => {
    Swal.fire({
      title: "Error",
      text: "La historia no ha sido creada",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      try {
        const response = await fetch(`${back_url}/stories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`,
          },
          body: JSON.stringify({
            descripcion: descripcion
          })
        });
        if (response.ok) {
          alert();
          toggle();
        } else {
          alertError();
        }
      } catch (error) {
        console.error("Error en la petición fetch para crear historia", error);
      }
    
  };


  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Crear Nueva Historia
        </h1>
      </div>
      <form className="grid grid-cols-1 gap-4 p-6">
        <div className="mb-4">
          <label
              htmlFor="descripcion"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Descripción
          </label>
          <input
            type="text"
            name="descripcion"
            id="descripcion"
            value={descripcion}
            onChange={ (e) => setDescripcion(e.target.value)}
            required
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"/>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Crear Historia
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalCrearHistorias };
