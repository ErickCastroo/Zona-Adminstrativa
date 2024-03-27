import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalBorrarIntencion({ closeModal }) {
  const {usuario} = useAuth();

  const [active, setActive] = useState(true);
  const [intentData, setIntentData] = useState({
    intenciones: [],
    intencionSeleccionada: "",
  });

  useEffect(() => {
    // Obtener todas las intenciones al montar el componente
    obtenerIntenciones();
  }, []);

  const obtenerIntenciones = async () => {
    try {
      // Realizar una petición GET para obtener todas las intenciones
      const response = await fetch(`${back_url}/intents`);
      if (response.ok) {
        // Si la petición es exitosa, parsear la respuesta a JSON
        const data = await response.json();
        // Actualizar el estado con la lista de intenciones
        setIntentData({
          ...intentData,
          intenciones: data,
        });
      } else {
        console.error("Error al obtener las intenciones");
      }
    } catch (error) {
      console.error("Error en la petición fetch para obtener intenciones", error);
    }
  };

  const handleIntentChange = (e) => {
    // Actualizar el estado con la intención seleccionada en el menú desplegable
    setIntentData({
      ...intentData,
      intencionSeleccionada: e.target.value,
    });
  };

  const borrarIntencion = async () => {
    try {
      // Realizar una petición DELETE para borrar la intención seleccionada
      const response = await fetch(`URL_DE_TU_API/intents/${intentData.intencionSeleccionada}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Intención eliminada exitosamente");
        // Realizar acciones adicionales si es necesario
        // Por ejemplo, puedes volver a obtener las intenciones actualizadas
        obtenerIntenciones();
      } else {
        console.error("Error al borrar la intención");
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error en la petición fetch para borrar intención", error);
    }
  };

  const toggle = () => {
    // Cambiar el estado de activo a inactivo y cerrar el modal
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Borrar Intención
        </h1>
      </div>
      <form className="grid grid-cols-1 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="intencionSeleccionada"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccionar Intención a Borrar
          </label>
          {/* Menú desplegable para seleccionar una intención */}
          <select
            id="intencionSeleccionada"
            name="intencionSeleccionada"
            value={intentData.intencionSeleccionada}
            onChange={handleIntentChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          >
            {/* Opción predeterminada deshabilitada */}
            <option value="" disabled>
              Selecciona una intención
            </option>
            {/* Mapear sobre la lista de intenciones y crear opciones para cada una */}
            {intentData.intenciones.map((intencion) => (
              <option key={intencion.id} value={intencion.id}>
                {intencion.nombre_intent}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center mt-4">
          {/* Botón para borrar la intención seleccionada */}
          <button
            type="button"
            onClick={borrarIntencion}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Borrar Intención
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalBorrarIntencion };
