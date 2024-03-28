import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalResCrear({ closeModal }) {
  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [respuesta, setRespuesta] = useState("");
  const [idIntencion, setIdIntencion] = useState("");
  const [intenciones, setIntenciones] = useState([]);

  useEffect(() => {
    obtenerIntenciones();
  }, []);

  const obtenerIntenciones = async () => {
    try {
      const response = await fetch(`${back_url}/intents`, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIntenciones(data);
      } else {
        console.error("Error al obtener las intenciones");
      }
    } catch (error) {
      console.error(
        "Error en la petición fetch para obtener intenciones",
        error
      );
    }
  };

  const alertErrorCrearRespuesta = () => {
    Swal.fire({
      title: "Error",
      text: "No se pudo crear la respuesta",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const crearRespuesta = async () => {
    try {
      const response = await fetch(`${back_url}/responses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({
          id_intent: idIntencion,
          respuesta: respuesta,
        }),
      });
      if (response.ok) {
        Swal.fire({
          title: "Respuesta creada",
          text: "La respuesta ha sido creada exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        closeModal();
      } else {
        alertErrorCrearRespuesta();
      }
    } catch (error) {
      alertErrorCrearRespuesta();
    }
  };

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal
      title="Crear respuesta"
      active={active}
      toggle={toggle}
      actionButton={crearRespuesta}
    >
      <div className="form-group">
        <label
          htmlFor="idIntencion"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Seleccionar Intención
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          id="idIntencion"
          value={idIntencion}
          onChange={(e) => setIdIntencion(e.target.value)}
        >
          <option value="">Selecciona una intención</option>
          {intenciones.map((intencion) => (
            <option key={intencion.id} value={intencion.id}>
              {intencion.id} - {intencion.nombre_intent}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label
          htmlFor="respuesta"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Respuesta
        </label>
        <input
          type="text"
          className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          id="respuesta"
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          type="submit"
          onClick={crearRespuesta}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Crear Respuesta
        </button>
      </div>
    </Modal>
  );
}

export { ModalResCrear };
