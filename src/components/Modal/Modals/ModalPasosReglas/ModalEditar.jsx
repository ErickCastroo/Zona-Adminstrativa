import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";


function ModalEditarPasosR({ closeModal }) {

  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [pasosReglas, setPasosReglas] = useState([]);
  const [idPasoSeleccionado, setIdPasoSeleccionado] = useState("");
  const [nuevoIdIntencion, setNuevoIdIntencion] = useState("");
  const [nuevoIdRegla, setNuevoIdRegla] = useState("");
  const [intenciones, setIntenciones] = useState([]);
  const [regla, setRegla] = useState([]);

  useEffect(() => {
    obtenerPasosReglas();
    obtenerIntenciones();
    obtenerReglas();
  }
  , []);

  const obtenerPasosReglas = async () => {
    try {
      const response = await fetch(`${back_url}/steps_rule`, {
        headers: {
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPasosReglas(data);
      } else {
        console.error("Error al obtener los pasosReglas");
      }
    }
    catch (error) {
      console.error(
        "Error en la petición fetch para obtener pasosReglas",
        error
      );
    }
  }

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
  }
  catch (error) {
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
      setRegla(data);
    } else {
      console.error("Error al obtener las reglas");
    }
  }
  catch (error) {
    console.error(
      "Error en la petición fetch para obtener reglas",
      error
    );
  }
}

const alert = () => {
  Swal.fire({
    title: "Pasos de Reglas editado",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
}

const alertErrorEditarPasoRegla = () => {
  Swal.fire({
    title: "Error",
    text: "No se pudo editar el paso de la regla",
    icon: "error",
    confirmButtonText: "Aceptar",
  });
}


const editarPasoRegla = async () => {
  try {
    const response = await fetch(
      `${back_url}/steps_rule/${idPasoSeleccionado}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({
          id_intent: nuevoIdIntencion,
          id_rule: nuevoIdRegla,
        }),
      }
    );
    if (response.ok) {
      alert();
      toggle();
      obtenerPasosReglas();
    } else {
      alertErrorEditarPasoRegla();
    }
  } 
  catch (error) {
    console.error("Error en la petición fetch para editar paso de regla", error);
  }
}




  const toggle = () => {
    setActive(!active);
    closeModal();
  };


  return (
<Modal active={active} toggle={toggle}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Editar Pasos de Reglas
        </h1>
      </div>

      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="idPasoSeleccionado"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccionar Paso de la Regla
          </label>
          <select
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
            value={idPasoSeleccionado}
            onChange={(e) => setIdPasoSeleccionado(e.target.value)}
          >
            <option value="">Selecciona un paso</option>
            {
              pasosReglas.map((paso) => (
                <option key={paso.id} value={paso.id}>
                  {paso.id}.- Intencion : {paso.id_intent} | Regla: {paso.id_rule}
                </option>
              ))
            }
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
            Nuevo ID de la Regla
          </label>
          <select
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
            value={nuevoIdRegla}
            onChange={(e) => setNuevoIdRegla(e.target.value)}
          >
            <option value="">Selecciona una regla</option>
            {regla.map((regla) => (
              <option key={regla.id} value={regla.id}>
                {regla.id} - {regla.descripcion}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 sm:col-span-2 flex justify-center items-center mt-4">
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
            onClick={(e) => {
              e.preventDefault();
              editarPasoRegla();
            }}
          >
            Actualizar Paso
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalEditarPasosR };
