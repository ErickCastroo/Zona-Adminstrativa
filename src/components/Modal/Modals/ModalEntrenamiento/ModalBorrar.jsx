import React, { useState } from "react";
import Modal from "../../index";

function ModalUserCrear({ closeModal }) {
  const [active, setActive] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    contraseña: "",
    rol: "entrenador",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("URL_DE_TU_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Usuario creado exitosamente");
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
          Borrar Usuario
        </h1>
      </div>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6">
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
            className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
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
            className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
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
            id="contraseña"
            name="contraseña"
            placeholder="********"
            value={formData.contraseña}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
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
            className="mt-1 p-2 border rounded-md w-full dark:text-black focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="entrenador">Entrenador</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2 flex justify-center items-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-2 sm:px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            Crear Usuario
          </button>
        </div>
      </form>
    </Modal>
  );
}

export { ModalUserCrear };
