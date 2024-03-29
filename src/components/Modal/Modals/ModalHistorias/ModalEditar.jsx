import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalEditarHistorias({ closeModal }) {
  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [intentData, setIntentData] = useState({
    idDes: "",
    descripcion: [],
    decrip: "",
  });

  useEffect(() => {
    obtenerHistorias();
  }, []);

  const alertSuccess = () => {
    Swal.fire({
      title: "Historia actualizada",
      text: "La historia ha sido actualizada correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const alertError = () => {
    Swal.fire({
      title: "Error",
      text: "La historia no ha sido actualizada correctamente",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };

  const obtenerHistorias = async () => {
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
        setIntentData({
          ...intentData,
          descripcion: data,
        });
      } else {
        alertError();
      }
    } catch (error) {
      console.error("Error en la petición fetch para obtener historias", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${back_url}/stories/${intentData.idDes}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify({
          descripcion: intentData.decrip,
        }),
      });
      if (response.ok) {
        alertSuccess();
      } else {
        alertError();
      }
    } catch (error) {
      console.error("Error en la petición fetch para actualizar historia", error);
    }
  };

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">Actualizar Historia</h1>
      </div>
      <form className="grid grid-cols-1 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="historiaSeleccionada"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccionar Historia a Actualizar
          </label>
          <select
            id="historiaSeleccionada"
            name="historiaSeleccionada"
            value={intentData.idDes}
            onChange={(e) => setIntentData({ ...intentData, idDes: e.target.value })}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              Selecciona una historia
            </option>
            {intentData.descripcion.map((historia) => (
              <option key={historia.id} value={historia.id}>
                {historia.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="descripcionHistoria" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descripción de la Historia
          </label>
          <input
            type="text"
            id="descripcionHistoria"
            name="descripcionHistoria"
            placeholder="Ingrese la nueva descripción"
            value={intentData.decrip}
            onChange={(e) => setIntentData({ ...intentData, decrip: e.target.value })}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="flex justify-center items-center mt-4">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          >
            Actualizar Historia
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalEditarHistorias };
