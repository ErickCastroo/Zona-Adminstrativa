import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalBorrarPasos({ closeModal }) {

  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [pasos, setPasos] = useState([]);
  const [idPasoSeleccionado, setIdPasoSeleccionado] = useState("");

  useEffect(() => {
    obtenerPasos();
  }
  , []);

  const obtenerPasos = async () => {
    try {
      const response = await fetch(`${back_url}/steps`, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPasos(data);
      } else {
        console.error("Error al obtener los pasos");
      }
    }
    catch (error) {
      console.error(
        "Error en la petición fetch para obtener pasos",
        error
      );
    }
  }

  const alert = () => {
    Swal.fire({
      title: "Paso eliminado",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }


  const alertErrorBorrarPaso = () => {
    Swal.fire({
      title: "Error",
      text: "No se pudo borrar el paso",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const borrarPaso = async () => {
    try {
      const response = await fetch(
        `${back_url}/steps/${idPasoSeleccionado}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${usuario.token}`,
          },
        }
      );
      if (response.ok) {
        alert();
        closeModal();
      } else {
        alertErrorBorrarPaso();
      }

    } catch (error) {
      alertErrorBorrarPaso();
    }
  }




  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
        <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Borrar Paso
        </h1>
      </div>
      <div className="form-group">
        <label
          htmlFor="respuestaSeleccionada"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Seleccionar Paso a Borrar
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          id="respuestaSeleccionada"
          value={idPasoSeleccionado}
          onChange={(e) => setIdPasoSeleccionado(e.target.value)}
        >
          <option value="">Selecciona una respuesta</option>
          {pasos.map((paso) => (
            <option key={paso.id} value={paso.id}>
              {paso.id}.- Intencion : {paso.id_intent} | Historia: {paso.id_story}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          onClick={borrarPaso}
        >
          Borrar paso
        </button>
      </div>
    </Modal>
  );
}

export { ModalBorrarPasos };
