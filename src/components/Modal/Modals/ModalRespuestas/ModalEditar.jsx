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
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Editar Respuestas
        </h1>
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="matricula"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccionar Respuesta
          </label>
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
    </div>
    <div className="mb-4">
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
    </div>
    <div className="mb-4">
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
    </div>
      
      <div className="col-span-1 sm:col-span-2 flex justify-center items-center mt-4">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          onClick={(e) => {
            e.preventDefault(); // Evita el comportamiento predeterminado del formulario
            editarRespuesta(); // Llama a la función para editar la respuesta
          }}
        >
          Actualizar Respuesta
        </button>
      </div>
  </form>
  
    </Modal>
  );
}

export { ModalResEditar };
