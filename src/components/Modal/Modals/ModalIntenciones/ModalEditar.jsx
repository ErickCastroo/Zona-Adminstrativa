import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2"; 
import { IoCloseSharp } from "react-icons/io5";

function ModalEditarIntencion({ closeModal }) {
  const { usuario } = useAuth();
  const [active, setActive] = useState(true);
  const [intentData, setIntentData] = useState({
    intenciones: [],
    intencionSeleccionada: "",
    descripcion: "",
    ejemplos: "",
    nombre_intent: "",
  });

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
        setIntentData((prevData) => ({
          ...prevData,
          intenciones: data,
        }));
      } else {
        console.error("Error al obtener las intenciones");
      }
    } catch (error) {
      console.error("Error en la petición fetch para obtener intenciones", error);
    }
  };

  const handleIntentChange = (e) => {
    const selectedIntentId = e.target.value;
    const selectedIntent = intentData.intenciones.find((intent) => intent.id === selectedIntentId);
  
    if (selectedIntent) {
      setIntentData((prevData) => ({
        ...prevData,
        intencionSeleccionada: selectedIntentId,
        descripcion: selectedIntent.descripcion || "",
        ejemplos: selectedIntent.ejemplos ? selectedIntent.ejemplos.join(", ") : "",
        nombre_intent: selectedIntent.nombre_intent || "",
      }));
    } else {
      console.error("La intención seleccionada no se encontró en la lista de intenciones.");
    }
  };

  const actualizarIntencion = async () => {
    try {
      const response = await fetch(`${back_url}/intents/${intentData.intencionSeleccionada}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          descripcion: intentData.descripcion || "",
          ejemplos: intentData.ejemplos.split(", ") || [] ,
          nombre_intent: intentData.nombre_intent || "",
        }),
      });

      if (response.ok) {
        console.log("Intención actualizada exitosamente");
        obtenerIntenciones();
      } else {
        console.error("Error al actualizar la intención");
      }
    } catch (error) {
      console.error("Error en la petición fetch para actualizar intención", error);
    }
  };

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <button onClick={toggle} className="absolute top-0 right-0 bg-transparent border-none text-2xl px-6 py-5 cursor-pointer">
        <IoCloseSharp/>
      </button>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Editar Intención
        </h1>
      </div>
      <form className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
        <div className="mb-4">
          <label htmlFor="intencionSeleccionada" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Seleccionar Intención a Editar
          </label>
          <select
            id="intencionSeleccionada"
            name="intencionSeleccionada"
            value={intentData.intencionSeleccionada}
            onChange={handleIntentChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              Selecciona una intención
            </option>
            {intentData.intenciones.map((intencion) => (
              <option key={intencion.id} value={intencion.id}>
                {intencion.nombre_intent
                  ? intencion.nombre_intent
                  : "Intención sin nombre"
                }
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="nombre_intent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nombre de la Intención
          </label>
          <input
            type="text"
            id="nombre_intent"
            name="nombre_intent"
            placeholder="saludar"
            value={intentData.nombre_intent}
            onChange={(e) => setIntentData({ ...intentData, nombre_intent: e.target.value })}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ejemplos" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Ejemplos (separados por coma)
          </label>
          <textarea
            id="ejemplos"
            name="ejemplos"
            placeholder="Ejemplo: Hola como estas, Hey que tal, Buenos días"
            value={intentData.ejemplos}
            onChange={(e) => setIntentData({ ...intentData, ejemplos: e.target.value })}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            placeholder="Esta intención está diseñada con el fin de saludar al bot y que este devuelva el saludo"
            value={intentData.descripcion}
            onChange={(e) => setIntentData({ ...intentData, descripcion: e.target.value })}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex justify-center items-center mt-4 md:col-span-2">
          <button
            type="button"
            onClick={actualizarIntencion}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
            >
            Actualizar Intención
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalEditarIntencion };
