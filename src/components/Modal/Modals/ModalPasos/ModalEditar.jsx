import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalEditarPasos({ closeModal }) {
  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [pasos, setPasos] = useState([]);
  const [idPasoSeleccionado, setIdPasoSeleccionado] = useState("");
  const [nuevoIdIntencion, setNuevoIdIntencion] = useState("");
  const [nuevoIdHistoria, setNuevoIdHistoria] = useState("");
  const [intenciones, setIntenciones] = useState([]);
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    obtenerPasos();
    obtenerIntenciones();
    obtenerHistorias();
  }, []);

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
    } catch (error) {
      console.error("Error en la petición fetch para obtener pasos", error);
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

  const obtenerHistorias = async () => {
    try {
      const response = await fetch(`${back_url}/stories`, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHistorias(data);
      } else {
        console.error("Error al obtener las historias");
      }
    } catch (error) {
      console.error(
        "Error en la petición fetch para obtener historias",
        error
      );
    }
  };

  const alertExitoEditarPaso = () => {
    Swal.fire({
      title: "Paso actualizado correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const alertErrorEditarPaso = () => {
    Swal.fire({
      title: "Error",
      text: "No se pudo actualizar el paso seleccionado",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const editarPaso = async () => {
    try {
      const response = await fetch(`${back_url}/steps/${idPasoSeleccionado}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({
          id_intent: nuevoIdIntencion,
          id_story: nuevoIdHistoria,
        }),
      });
      if (response.ok) {
        alertExitoEditarPaso();
        obtenerPasos();
        closeModal();
      } else {
        alertErrorEditarPaso();
      }
    } catch (error) {
      console.error("Error en la petición fetch para editar paso", error);
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
          Editar Pasos
        </h1>
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="idPasoSeleccionado"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccionar Paso
          </label>
          <select
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
            value={idPasoSeleccionado}
            onChange={(e) => setIdPasoSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un paso</option>
            {pasos.map((paso) => (
              <option key={paso.id} value={paso.id}>
                {paso.id} - {paso.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="nuevoIdIntencion"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nuevo ID de la Intención
          </label>
          <select
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
            value={nuevoIdIntencion}
            onChange={(e) => setNuevoIdIntencion(e.target.value)}
          >
            <option value="">Selecciona una intención</option>
            {intenciones.map((intencion) => (
              <option key={intencion.id} value={intencion.id}>
                {intencion.id} - {intencion.nombre_intent}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="nuevoIdHistoria"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nuevo ID de la Historia
          </label>
          <select
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
            value={nuevoIdHistoria}
            onChange={(e) => setNuevoIdHistoria(e.target.value)}
          >
            <option value="">Selecciona una historia</option>
            {historias.map((historia) => (
              <option key={historia.id} value={historia.id}>
                {historia.id} - {historia.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2 flex justify-center items-center mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
            onClick={(e) => {
              e.preventDefault();
              editarPaso();
            }}
          >
            Actualizar Paso
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalEditarPasos };
