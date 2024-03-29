import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";


function ModalBorrarHistorias({ closeModal }) {

  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [intentData, setIntentData] = useState({
    idDes: "",
    descripcion: [],
  });

  useEffect(() => {
    obtenerId();
  }, []);

  const alert = () => {
    Swal.fire({
      title: "Historia eliminada",
      text: "La historia ha sido eliminada exitosamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }

  const alertError = () => {
    Swal.fire({
      title: "Error",
      text: "La historia no ha sido eliminada",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
  const obtenerId = async () => {
    try {
      const response = await fetch(`${back_url}/stories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setIntentData(
          {
            ...intentData,
            descripcion: data,
          }
        );
      } else {
        alertError();
      }
    } catch (error) {
      console.error("Error en la petición fetch para obtener id de historia", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${back_url}/stories/${intentData.idDes}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        alert();
        toggle();
        obtenerId();
      } else {
        alertError();
      }
    } catch (error) {
      console.error("Error en la petición fetch para borrar historia", error);
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
          Borrar Historia
        </h1>
      </div>
      <form className="grid grid-cols-1 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="intencionSeleccionada"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccionar Historia a Borrar
          </label>
          {/* Menú desplegable para seleccionar una intención */}
          <select
            id="intencionSeleccionada"
            name="intencionSeleccionada"
            value={intentData.idDes}
            onChange={(e) => setIntentData({ ...intentData, idDes: e.target.value })}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          >
            {/* Opción predeterminada deshabilitada */}
            <option value="" disabled>
              Selecciona una historia
            </option>
            {/* Mapear sobre la lista de intenciones y crear opciones para cada una */}
            {intentData.descripcion.map((descripcion) => (
              <option key={descripcion.id} value={descripcion.id}>
                {descripcion.descripcion}
              </option>
            ))

            }
          </select>
        </div>
        <div className="flex justify-center items-center mt-4">
          {/* Botón para borrar la intención seleccionada */}
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Borrar Historia
          </button>
        </div>
      </form>

    </Modal>
  );
}

export { ModalBorrarHistorias };
