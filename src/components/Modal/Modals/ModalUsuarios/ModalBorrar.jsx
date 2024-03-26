import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalUserBorrar({ closeModal }) {
  const { usuario } = useAuth();

  const [selectedUserName, setSelectedUserName] = useState("");

  const [active, setActive] = useState(true);
  const [userData, setUserData] = useState({
    usuarios: [],
    usuariosSeleccionados: "",
  });

  useEffect(() => {
    // Obtener todas las intenciones al montar el componente
    obtenerIntenciones();
  }, []);

  const obtenerIntenciones = async () => {
    try {
      // Realizar una petición GET para obtener todas las intenciones
      const response = await fetch(`${back_url}/usuarios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        // Si la petición es exitosa, parsear la respuesta a JSON
        const data = await response.json();
        // Actualizar el estado con la lista de intenciones
        setUserData({
          ...userData,
          usuarios: data, // Cambiar 'user' a 'usuarios'
        });
      } else {
        console.error("Error al obtener las usuarios");
      }
    } catch (error) {
      console.error("Error en la petición fetch para obtener usuarios", error);
    }
  };

  const handleIntentChange = (e) => {
    // Actualizar el estado con la intención seleccionada en el menú desplegable
    setUserData({
      ...userData,
      usuariosSeleccionados: e.target.value,
    });
  };
  const alert = () => {
    Swal.fire({
      title: "Usuario eliminado",
      text: "El usuario ha sido eliminado exitosamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const borrarIntencion = async () => {
    try {
      // Realizar una petición DELETE para borrar la intención seleccionada
      const response = await fetch(
        `${back_url}/usuarios/${userData.usuariosSeleccionados}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${usuario.token}`,
          },
        }
      );
      if (response.ok) {
        alert();
        // Realizar acciones adicionales si es necesario
        // Por ejemplo, puedes volver a obtener las intenciones actualizadas
        obtenerIntenciones();
      } else {
        console.error("Error al borrar al usuario");
        // Mostrar un mensaje de error al usuario
      }
    } catch (error) {
      console.error("Error en la petición fetch para borrar intención", error);
    }
  };

  const toggle = () => {
    // Cambiar el estado de activo a inactivo y cerrar el modal
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Borrar Usuario
        </h1>
      </div>
      <label
            htmlFor="intencionSeleccionada"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Esto no tiene vuelta atrás, ¿Estás seguro de querer borrar este usuario?
          </label>
      <form className="grid grid-cols-1 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="intencionSeleccionada"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccionar Usuario a Borrar
          </label>
          {/* Menú desplegable para seleccionar una intención */}
          <select
            id="intencionSeleccionada"
            name="intencionSeleccionada"
            value={userData.usuariosSeleccionados}
            onChange={handleIntentChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          >
            {/* Opción predeterminada deshabilitada */}
            <option className="text-black" value="" disabled>
              Selecciona un Usuario
            </option>
            {/* Mapear sobre la lista de usuarios y crear opciones para cada uno */}
            {userData.usuarios.map((usuario) => (
              <option key={usuario.id} value={usuario.matricula}>
                {`${usuario.matricula} - ${usuario.nombre}`}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center items-center mt-4">
          {/* Botón para borrar la intención seleccionada */}
          <button
            type="button"
            onClick={borrarIntencion}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
          >
            Borrar usuario
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalUserBorrar };
