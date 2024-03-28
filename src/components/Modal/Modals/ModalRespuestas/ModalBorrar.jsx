import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalResBorrar({ closeModal }) {
  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [respuestas, setRespuestas] = useState([]);
  const [idRespuestaSeleccionada, setIdRespuestaSeleccionada] = useState("");

  useEffect(() => {
    obtenerRespuestas();
  }, []);

  const obtenerRespuestas = async () => {
    try {
      const response = await fetch(`${back_url}/responses`, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRespuestas(data);
      } else {
        console.error("Error al obtener las respuestas");
      }
    } catch (error) {
      console.error(
        "Error en la petición fetch para obtener respuestas",
        error
      );
    }
  };

  const alertErrorBorrarRespuesta = () => {
    Swal.fire({
      title: "Error",
      text: "No se pudo borrar la respuesta",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const borrarRespuesta = async () => {
    try {
      const response = await fetch(
        `${back_url}/responses/${idRespuestaSeleccionada}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${usuario.token}`,
          },
        }
      );
      if (response.ok) {
        Swal.fire({
          title: "Respuesta borrada",
          text: "La respuesta ha sido borrada exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        closeModal();
      } else {
        alertErrorBorrarRespuesta();
      }
    } catch (error) {
      alertErrorBorrarRespuesta();
    }
  };

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal title="Borrar Respuesta" active={active} toggle={toggle}>
      <div className="form-group">
        <label
          htmlFor="respuestaSeleccionada"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Seleccionar Respuesta a Borrar
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          id="respuestaSeleccionada"
          value={idRespuestaSeleccionada}
          onChange={(e) => setIdRespuestaSeleccionada(e.target.value)}
        >
          <option value="">Selecciona una respuesta</option>
          {respuestas.map((respuesta) => (
            <option key={respuesta.id} value={respuesta.id}>
              {respuesta.respuesta}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={borrarRespuesta}
        >
          Borrar Respuesta
        </button>
      </div>
    </Modal>
  );
}

export { ModalResBorrar };
