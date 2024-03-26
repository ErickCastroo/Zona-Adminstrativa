import React, { useState } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalUserCrear({ closeModal }) {
  const { usuario } = useAuth();
  const [active, setActive] = useState(true);
  const [formData, setFormData] = useState({
    matricula: "",
    nombre: "",
    correo: "",
    password: "",
    rol: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const alert = () => {
    Swal.fire({
      title: "Usuario creado",
      text: "El usuario ha sido creado exitosamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${back_url}/usuarios`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert();
      } else {
        console.error("Error al crear usuario");
      }
    } catch (error) {
      console.error("Error en la petición fetch", error);
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
          Crear Usuario
        </h1>
      </div>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Matricula
          </label>
          <input
            type="text"
            id="matricula"
            name="matricula"
            value={formData.matricula}
            placeholder="Matricula del usuario"
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="nombre"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            placeholder="Nombre completo"
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="correo"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Correo Electrónico
          </label>
          <input
            type="email"
            id="correo"
            placeholder="nombre@ejemplo.com"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="contraseña"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rol"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Rol
          </label>
          <select
            id="rol"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled defaultValue>
              Selecciona un rol
            </option>
            <option value="0">Entrenador</option>
            <option value="1">Admin</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2 flex justify-center items-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-2 sm:px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={handleSubmit}
          >
            Crear Usuario
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalUserCrear };
