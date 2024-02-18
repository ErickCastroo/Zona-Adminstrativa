// Importa React y el componente Modal desde el archivo "../../index"
import React, { useState } from "react";
import Modal from "../../index";

// Componente funcional ModalCrearIntencion
function ModalCrearIntencion({ closeModal }) {
  // Estado local para controlar la visibilidad del modal
  const [active, setActive] = useState(true);

  // Estado local para almacenar los datos de la intención
  const [intentData, setIntentData] = useState({
    descripcion: "",
    ejemplos: "",
    nombre_intent: "",
  });

  // Función para manejar cambios en los campos de entrada
  const handleChange = (e) => {
    setIntentData({
      ...intentData,
      [e.target.name]: e.target.value,
    });
  };

  // Función para manejar cambios en el campo de ejemplos separados por coma
  const handleExamplesChange = (e) => {
    // Puedes analizar la entrada del usuario para crear una matriz de ejemplos
    const examples = e.target.value.split(",");
    setIntentData({
      ...intentData,
      ejemplos: examples,
    });
  };

  // Función para alternar la visibilidad del modal y cerrarlo
  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Agregar el prefijo "utter_" al nombre de respuesta
    const updatedIntentData = {
      ...intentData,
      nombre_respuesta: `utter_${intentData.nombre_intent}`,
    };

    try {
      // Realiza una solicitud fetch para enviar los datos al servidor
      const response = await fetch("URL_DE_TU_API_PARA_CREAR_INTENCION", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedIntentData),
      });

      // Verifica si la respuesta del servidor es exitosa
      if (response.ok) {
        console.log("Intención creada exitosamente");
        // Realizar acciones adicionales si es necesario
      } else {
        console.error("Error al crear intención");
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error(
        "Error en la petición fetch para la creación de intención",
        error
      );
    }

    // Cierra el modal después de enviar el formulario
    toggle();
  };

  // Renderiza el componente ModalCrearIntencion
  return (
    <Modal active={active} toggle={toggle}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Crear Nueva Intención
        </h1>
      </div>
      <form className="grid grid-cols-1 gap-4 p-6" onSubmit={handleSubmit}>
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
            placeholder="Esta intención está diseñada con el fin de saludar al bot y que este devuelva el saludo"
            value={intentData.descripcion}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
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
            placeholder="Ejemplo: Hola como estas, Hey que tal, Buenos días"
            value={intentData.ejemplos}
            onChange={handleExamplesChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
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
            placeholder="saludar"
            value={intentData.nombre_intent}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        
        <div className="flex justify-center items-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Crear Intención
          </button>
        </div>
      </form>
    </Modal>
  );
}

// Exporta el componente ModalCrearIntencion
export { ModalCrearIntencion };
