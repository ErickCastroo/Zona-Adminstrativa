import React, { useState, useEffect } from "react";
import { back_url } from "@/config/const";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import Modal from "../../index";
import Swal from "sweetalert2";

function ModalUserEditar({ closeModal }) {
  const { usuario } = useAuth();

  const [active, setActive] = useState(true);
  const [formData, setFormData] = useState({
    matricula: "",
    nombre: "",
    correo: "",
    rol: "",
  });
  const [matriculas, setMatriculas] = useState([]);

  useEffect(() => {
    obtenerMatriculas();
  }, []);

  const obtenerMatriculas = async () => {
    try {
      const response = await fetch(`${back_url}/usuarios`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMatriculas(data.map(usuario => usuario.matricula));
      } else {
        console.error("Error al obtener las matrículas");
      }
    } catch (error) {
      console.error("Error en la petición fetch para obtener matrículas", error);
    }
  };
  const alert = () => {
    Swal.fire({
      title: "Usuario actualizado",
      text: "El usuario ha sido actualizado exitosamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  };
  const alertError = () => {
    Swal.fire({
      title: "Error al actualizar usuario",
      text: "Ocurrió un error al actualizar el usuario",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  };


  const handleChangeMatricula = async (e) => {
    const matriculaSeleccionada = e.target.value;
    try {
      const response = await fetch(`${back_url}/usuarios/${matriculaSeleccionada}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setFormData(userData);
      } else {
        console.error("Error al obtener los detalles del usuario");
      }
    } catch (error) {
      console.error("Error en la petición fetch para obtener detalles del usuario", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${back_url}/usuarios/${formData.matricula}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usuario.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert();
        console.log("Usuario actualizado exitosamente");
      } else {
        alertError();
        console.error("Error al actualizar usuario");
      }
    } catch (error) {
      alertError();
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
          Editar Usuario
        </h1>
      </div>
      <form className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 p-6">
        <div className="mb-4">
          <label
            htmlFor="matricula"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Seleccionar Matrícula
          </label>
          <select
            id="matricula"
            name="matricula"
            onChange={handleChangeMatricula}
            className="mt-1 p-2 border rounded-md w-full text-black focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" defaultValue disabled>Seleccionar Matrícula</option>
            {matriculas.map((matricula) => (
              <option key={matricula} value={matricula}>
                {matricula}
              </option>
            ))}
          </select>
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
            name="correo"
            value={formData.correo}
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
            <option value="0">Entrenador</option>
            <option value="1">Admin</option>
          </select>
        </div>
        <div className="col-span-1 sm:col-span-2 flex justify-center items-center mt-4">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
          >
            Actualizar Usuario
          </button>
        </div>
      </form>
    </Modal>
  );
}

export  {ModalUserEditar};