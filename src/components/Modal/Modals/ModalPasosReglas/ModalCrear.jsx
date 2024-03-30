import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";
import { t } from "i18next";

function ModalCrearPasosR({ closeModal }) {

  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [intenciones, setIntenciones] = useState([]);
  const [reglas, setReglas] = useState([]);
  const [idIntent, setIdIntent] = useState("");
  const [idrule, setIdrule] = useState("");

  useEffect(() => {
    obtenerIntenciones();
    obtenerReglas();
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
  }

  const obtenerReglas = async () => {
    try {
      const response = await fetch(`${back_url}/rules`, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setReglas(data);
      } else {
        console.error("Error al obtener las reglas");
      }
    } catch (error) {
      console.error(
        "Error en la petición fetch para obtener reglas",
        error
      );
    }
  }

  const alertErrorAgregarPaso = () => {
    Swal.fire({
      title: "Error",
      text: "No se pudo agregar el paso",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const agregarPasosReglas = async (e) => {
    try {
      const response = await fetch(`${back_url}/steps_rule`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({
          id_intent: idIntent,
          id_rule: idrule,
        }),
      });
      if (response.ok) {
        toggle();
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
        Agregar Pasos a Reglas
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
          Seleccione la Regla
        </label>
        <select
          className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          value={idrule}
          onChange={(e) => setIdrule(e.target.value)}
        >
          <option value="" disabled>Selecciona una regla</option>
          {reglas.map((regla) => (
            <option key={regla.id} value={regla.id}>
              {regla.id} - {regla.descripcion}
            </option>
          ))}
        </select>
      </div>
      <div className="flex justify-center items-center mt-4">
        <button
          type="button"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          onClick={agregarPasosReglas}
        >
          Agregar Paso a Reglas
        </button>
      </div>
    </form>
  </Modal>
  );
}

export { ModalCrearPasosR };
