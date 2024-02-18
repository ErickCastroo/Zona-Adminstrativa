// Importa los módulos necesarios de React y otras bibliotecas
import React, { useState, useEffect } from "react";
import Modal from "../../index"; // Asegúrate de que la ruta al componente Modal sea correcta
import { IoCloseSharp } from "react-icons/io5";

// Define el componente ModalEditarIntencion
function ModalEditarIntencion({ closeModal }) {
  // Estados locales para el control del modal y los datos de la intención
  const [active, setActive] = useState(true);
  const [intentData, setIntentData] = useState({
    intenciones: [],
    intencionSeleccionada: "",
    descripcion: "",
    ejemplos: "",
    nombre_intent: "",
  });

  // Efecto de montaje para obtener todas las intenciones al cargar el componente
  useEffect(() => {
    obtenerIntenciones();
  }, []);

  // Función asincrónica para obtener las intenciones desde la API
  const obtenerIntenciones = async () => {
    try {
      const response = await fetch("URL_DE_TU_API/intents"); // Reemplaza con la URL real de tu API
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
  const selectedIntentId = e.target.value;
  // Buscar la intención seleccionada en la lista de intenciones
  const selectedIntent = intentData.intenciones.find((intent) => intent.id === selectedIntentId);

  // Actualizar el estado con los detalles de la intención seleccionada, incluido el nombre de respuesta
  setIntentData((prevData) => ({
    ...prevData,
    intencionSeleccionada: selectedIntentId,
    descripcion: selectedIntent.descripcion,
    ejemplos: selectedIntent.ejemplos.join(", "),
    nombre_intent: selectedIntent.nombre_intent,
    nombre_respuesta: `utter_${selectedIntent.nombre_intent}` // Usar el valor actualizado
  }));
};

  // Función asincrónica para realizar la actualización de la intención seleccionada mediante una petición PUT
  const actualizarIntencion = async () => {
    try {
      const response = await fetch(`URL_DE_TU_API/intents/${intentData.intencionSeleccionada}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descripcion: intentData.descripcion,
          ejemplos: intentData.ejemplos.split(", "),
          nombre_intent: intentData.nombre_intent, // Mantener el nombre original de la intención
        }),
      });

      if (response.ok) {
        console.log("Intención actualizada exitosamente");
        // Realizar acciones adicionales si es necesario, por ejemplo, volver a obtener las intenciones actualizadas
        obtenerIntenciones();
      } else {
        console.error("Error al actualizar la intención");
        // Mostrar un mensaje de error al usuario si es necesario
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
    {/* Botón para cerrar el modal */}
          <button onClick={toggle} className="absolute top-0 right-0 bg-transparent border-none text-2xl px-6 py-5 cursor-pointer">
            <IoCloseSharp/>
          </button>
          {/* Contenido principal del modal */}
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-black dark:text-white">
              Editar Intención
            </h1>
          </div>
          {/* Formulario de edición de intención */}
          <form className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
            {/* Menú desplegable para seleccionar una intención */}
            <div className="mb-4">
              <label htmlFor="intencionSeleccionada" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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

            {/* Campo de nombre de la intención */}
            <div className="mb-4">
              <label htmlFor="nombre_intent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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

            {/* Campo de ejemplos */}
            <div className="mb-4">
              <label htmlFor="ejemplos" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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

            {/* Campo de descripción */}
            <div className="mb-4">
              <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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

            {/* Botón para actualizar la intención seleccionada */}
            <div className="flex justify-center items-center mt-4 md:col-span-2">
              <button
                type="button"
                onClick={actualizarIntencion}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Actualizar Intención
              </button>
            </div>
          </form>
    </Modal>
  );
}

// Exporta el componente ModalEditarIntencion para su uso en otras partes de la aplicación
export { ModalEditarIntencion };
