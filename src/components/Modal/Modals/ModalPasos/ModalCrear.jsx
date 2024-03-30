import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalCrearPasos({ closeModal }) {
  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [intenciones, setIntenciones] = useState([]);
  const [historias, setHistorias] = useState([]);
  const [idIntent, setIdIntent] = useState("");
  const [idStory, setIdStory] = useState("");

  useEffect(() => {
    obtenerIntenciones();
    obtenerHistorias();
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

  const alertErrorAgregarPaso = () => {
    Swal.fire({
      title: "Error",
      text: "No se pudo agregar el paso",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const agregarPaso = async () => {
    try {
      const response = await fetch(`${back_url}/steps`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({
          id_intent: idIntent,
          id_story: idStory,
        }),
      });
      if (response.ok) {
        Swal.fire({
          title: "Paso agregado",
          text: "El paso se agregó correctamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        alertErrorAgregarPaso();
      }
    } catch (error) {
      alertErrorAgregarPaso();
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
          Agregar Pasos
        </h1>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-1 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="id_intent"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccione la Intención
          </label>
          <select
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
            value={idIntent}
            onChange={(e) => setIdIntent(e.target.value)}
          >
            <option value="" disabled >Selecciona una intención</option>
            {intenciones.map((intencion) => (
              <option key={intencion.id} value={intencion.id}>
                {intencion.id} - {intencion.nombre_intent}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label
            htmlFor="id_story"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccione la Historia
          </label>
          <select
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
            value={idStory}
            onChange={(e) => setIdStory(e.target.value)}
          >
            <option value="" disabled>Selecciona una historia</option>
            {historias.map((historia) => (
              <option key={historia.id} value={historia.id}>
                {historia.id} - {historia.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            type="button"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={agregarPaso}
          >
            Agregar Paso
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalCrearPasos };
