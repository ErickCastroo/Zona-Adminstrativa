import React, { useState } from "react";
import Modal from "../../index";

function ModalCrearIntencion({ closeModal }) {
  const [active, setActive] = useState(true);
  const [intentData, setIntentData] = useState({
    descripcion: "",
    ejemplos: "",
    nombre_intent: "",
    nombre_respuesta: "",
  });

  const handleChange = (e) => {
    setIntentData({
      ...intentData,
      [e.target.name]: e.target.value,
    });
  };

  const handleExamplesChange = (e) => {
    // Puedes analizar la entrada del usuario para crear una matriz de ejemplos
    const examples = e.target.value.split(",");
    setIntentData({
      ...intentData,
      ejemplos: examples,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("URL_DE_TU_API_PARA_CREAR_INTENCION", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(intentData),
      });

      if (response.ok) {
        console.log("Intención creada exitosamente");
        // Realizar acciones adicionales si es necesario
      } else {
        console.error("Error al crear intención");
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error en la petición fetch para la creación de intención", error);
    }

    toggle();
  };

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

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
            placeholder="Esta intención esta diseñada con el fin de saludar al bot y que este devuelva el saludo"
            value={intentData.descripcion}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="ejemplos"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {/*cada vez que el usuario ingrese una coma en el campo de texto, la cadena se dividirá en múltiples elementos en el array. */}
            Ejemplos (separados por coma)
          </label>
          <textarea
            id="ejemplos"
            name="ejemplos"
            placeholder="Ejemplo: Hola como estas, Hey que tal, Buenos dias"
            value={intentData.ejemplos}
            onChange={handleExamplesChange}
            className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
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
            className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
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
            placeholder="utter_saludar"
            value={intentData.nombre_respuesta}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
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

export { ModalCrearIntencion };
