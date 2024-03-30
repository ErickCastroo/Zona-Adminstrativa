import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalBorrarPasosR({ closeModal }) {

  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [pasosReglas, setPasosReglas] = useState([]);
  const [idPasoReglaSeleccionado, setIdPasoReglaSeleccionado] = useState("");

  useEffect(() => {
    obtenerPasosReglas();
  }
  , []);

  const obtenerPasosReglas = async () => {
    try {
      const response = await fetch(`${back_url}/steps_rule`, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPasosReglas(data);
      } else {
        console.error("Error al obtener los pasosReglas");
      }
    }
    catch (error) {
      console.error(
        "Error en la petición fetch para obtener pasosReglas",
        error
      );
    }
  }

  const alert = () => {
    Swal.fire({
      title: "Pasos de Reglas eliminado",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }

  const alertErrorBorrarPasoRegla = () => {
    Swal.fire({
      title: "Error",
      text: "No se pudo borrar el paso de la regla",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }

  const borrarPasoRegla = async () => {
    try {
      const response = await fetch(
        `${back_url}/steps_rule/${idPasoReglaSeleccionado}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${usuario.token}`,
          },
        }
      );
      if (response.ok) {
        alert();
        toggle();
        obtenerPasosReglas();
      } else {
        alertErrorBorrarPasoRegla();
      }

    } catch (error) {
      alertErrorBorrarPasoRegla();
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
          Borrar Pasos de Reglas
        </h1>
      </div>
      <div className="form-group">
        <label
          htmlFor="respuestaSeleccionada"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Seleccionar Paso de Regla a Borrar
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          id="respuestaSeleccionada"
          value={idPasoReglaSeleccionado}
          onChange={(e) => setIdPasoReglaSeleccionado(e.target.value)}
        >
          <option value="">Selecciona un paso de regla</option>
          {pasosReglas.map((pasoRegla) => (
            <option key={pasoRegla.id} value={pasoRegla.id}>
              {pasoRegla.id}.-  Intencion: {pasoRegla.id_intent} | Regla: {pasoRegla.id_rule}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          onClick={borrarPasoRegla}
        >
          Borrar paso de regla
        </button>
      </div>
    </Modal>
  );
}

export { ModalBorrarPasosR };
