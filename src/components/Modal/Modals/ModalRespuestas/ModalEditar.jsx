import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalResEditar({ closeModal }) {
  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [respuestas, setRespuestas] = useState([]);
  const [idRespuestaSeleccionada, setIdRespuestaSeleccionada] = useState("");
  const [nuevoContenidoRespuesta, setNuevoContenidoRespuesta] = useState("");
  const [idNuevaIntencion, setIdNuevaIntencion] = useState("");
  const [intenciones, setIntenciones] = useState([]);

  useEffect(() => {
    obtenerRespuestas();
    obtenerIntenciones();
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

  const alertErrorEditarRespuesta = () => {
    Swal.fire({
      title: "Error",
      text: "No se pudo editar la respuesta",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const editarRespuesta = async () => {
    try {
      const response = await fetch(
        `${back_url}/responses/${idRespuestaSeleccionada}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`,
          },
          body: JSON.stringify({
            respuesta: nuevoContenidoRespuesta,
            id_intent: idNuevaIntencion,
          }),
        }
      );
      if (response.ok) {
        Swal.fire({
          title: "Respuesta editada",
          text: "La respuesta se editó correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        alertErrorEditarRespuesta();
      }
    } catch (error) {
      alertErrorEditarRespuesta();
    }
  };

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  const handleRespuestaSeleccionada = (idRespuesta) => {
    setIdRespuestaSeleccionada(idRespuesta);
    const respuestaSeleccionada = respuestas.find(
      (respuesta) => respuesta.id === idRespuesta
    );
    if (respuestaSeleccionada) {
      setNuevoContenidoRespuesta(respuestaSeleccionada.respuesta);
      setIdNuevaIntencion(respuestaSeleccionada.id_intent);
    }
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1 className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        Editar Respuesta
      </h1>
      <select
        className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
        value={idRespuestaSeleccionada}
        onChange={(e) => handleRespuestaSeleccionada(e.target.value)}
      >
        <option value="">Selecciona una respuesta</option>
        {respuestas.map((respuesta) => (
          <option key={respuesta.id} value={respuesta.id}>
            {respuesta.respuesta}
          </option>
        ))}
      </select>
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor="nuevoContenidoRespuesta"
      >
        Nuevo Contenido de la Respuesta
      </label>
      <input
        type="text"
        id="nuevoContenidoRespuesta"
        className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
        value={nuevoContenidoRespuesta}
        onChange={(e) => setNuevoContenidoRespuesta(e.target.value)}
      />
      <label
        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        htmlFor="idNuevaIntencion"
      >
        ID de la Intención
      </label>
      <select
        className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
        value={idNuevaIntencion}
        onChange={(e) => setIdNuevaIntencion(e.target.value)}
      >
        <option value="">Selecciona una intención</option>
        {intenciones.map((intencion) => (
          <option key={intencion.id} value={intencion.id}>
            {intencion.id} - {intencion.nombre_intent}
          </option>
        ))}
      </select>
      <div className="flex justify-center items-center mt-4">
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={editarRespuesta}
        >
          Editar Respuesta
        </button>
      </div>
    </Modal>
  );
}

export { ModalResEditar };
