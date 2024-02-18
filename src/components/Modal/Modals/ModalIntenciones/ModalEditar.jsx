import React, { useState, useEffect } from "react";
import Modal from "../../index";
import { IoCloseSharp } from "react-icons/io5";

function ModalEditarIntencion({ closeModal }) {
  // Estado local para controlar la visibilidad del modal
  const [active, setActive] = useState(true);
  // Estado local para almacenar datos relacionados con las intenciones y el formulario
  const [intentData, setIntentData] = useState({
    intenciones: [], // Lista de intenciones
    intencionSeleccionada: "", // ID de la intención seleccionada
    descripcion: "", // Descripción de la intención
    ejemplos: "", // Ejemplos de la intención
    nombre_intent: "", // Nombre de la intención
    nombre_respuesta: "", // Nombre de la respuesta asociada
  });

  // Efecto de montaje para obtener todas las intenciones al cargar el componente
  useEffect(() => {
    obtenerIntenciones();
  }, []);

  // Función para obtener todas las intenciones mediante una petición GET
  const obtenerIntenciones = async () => {
    try {
      const response = await fetch("URL_DE_TU_API/intents");
      if (response.ok) {
        const data = await response.json();
        // Actualizar el estado con la lista de intenciones obtenida
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

  // Función para manejar el cambio de intención seleccionada en el menú desplegable
  const handleIntentChange = (e) => {
    // Obtener el ID de la intención seleccionada en el menú desplegable
    const selectedIntentId = e.target.value;
    // Buscar la intención seleccionada en la lista de intenciones
    const selectedIntent = intentData.intenciones.find((intent) => intent.id === selectedIntentId);
    // Actualizar el estado con los detalles de la intención seleccionada
    setIntentData({
      ...intentData,
      intencionSeleccionada: selectedIntentId,
      descripcion: selectedIntent.descripcion,
      ejemplos: selectedIntent.ejemplos.join(", "), // Convertir el array a una cadena separada por comas
      nombre_intent: selectedIntent.nombre_intent,
      nombre_respuesta: selectedIntent.nombre_respuesta,
    });
  };

  // Función para realizar la actualización de la intención seleccionada mediante una petición PUT
  const actualizarIntencion = async () => {
    try {
      const response = await fetch(`URL_DE_TU_API/intents/${intentData.intencionSeleccionada}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descripcion: intentData.descripcion,
          ejemplos: intentData.ejemplos.split(", "), // Convertir la cadena a un array
          nombre_intent: intentData.nombre_intent,
          nombre_respuesta: intentData.nombre_respuesta,
        }),
      });

      if (response.ok) {
        console.log("Intención actualizada exitosamente");
        // Realizar acciones adicionales si es necesario
        // Por ejemplo, puedes volver a obtener las intenciones actualizadas
        obtenerIntenciones();
      } else {
        console.error("Error al actualizar la intención");
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error en la petición fetch para actualizar intención", error);
    }
  };

  // Función para cerrar el modal y cambiar el estado de activo a inactivo
  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  // Renderizado del componente
  return (
    <Modal active={active} toggle={toggle}>
      {/* Contenido del modal */}
      <div className="fixed top-0 left-0 w-full h-full text-slate-200 bg-black bg-opacity-60 flex justify-center items-center">
        <div className="relative dark:bg-slate-900 text-slate-200 border border-gray-200 dark:border-gray-400 rounded-sm bg-white w-[70%] max-h-[70%] p-20 rounded-5 shadow-md overflow-auto">
          {/* Botón para cerrar el modal */}
          <button onClick={toggle} className="absolute top-0 right-0 bg-transparent border-none text-2xl px-6 py-5 cursor-pointer">
            <IoCloseSharp/>
          </button>
          {/* Título del modal */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Editar Intención
            </h1>
          </div>
          {/* Formulario de edición de intención */}
          <form className="grid grid-cols-1 gap-4 p-6">
            {/* Menú desplegable para seleccionar una intención */}
            <div className="mb-4">
              <label
                htmlFor="intencionSeleccionada"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Seleccionar Intención a Editar
              </label>
              <select
                id="intencionSeleccionada"
                name="intencionSeleccionada"
                value={intentData.intencionSeleccionada}
                onChange={handleIntentChange}
                className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
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
            {/* Campo de descripción */}
            <div className="mb-4">
              <label
                htmlFor="descripcion"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Descripción
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={intentData.descripcion}
                onChange={(e) => setIntentData({ ...intentData, descripcion: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Campo de ejemplos */}
            <div className="mb-4">
              <label
                htmlFor="ejemplos"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Ejemplos (separados por coma)
              </label>
              <textarea
                id="ejemplos"
                name="ejemplos"
                value={intentData.ejemplos}
                onChange={(e) => setIntentData({ ...intentData, ejemplos: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Campo de nombre de la intención */}
            <div className="mb-4">
              <label
                htmlFor="nombre_intent"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nombre de la Intención
              </label>
              <input
                type="text"
                id="nombre_intent"
                name="nombre_intent"
                value={intentData.nombre_intent}
                onChange={(e) => setIntentData({ ...intentData, nombre_intent: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Campo de nombre de la respuesta */}
            <div className="mb-4">
              <label
                htmlFor="nombre_respuesta"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nombre de la Respuesta
              </label>
              <input
                type="text"
                id="nombre_respuesta"
                name="nombre_respuesta"
                value={intentData.nombre_respuesta}
                onChange={(e) => setIntentData({ ...intentData, nombre_respuesta: e.target.value })}
                className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
              />
            </div>
            {/* Botón para actualizar la intención seleccionada */}
            <div className="flex justify-center items-center mt-4">
              <button
                type="button"
                onClick={actualizarIntencion}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Actualizar Intención
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
export { ModalEditarIntencion };