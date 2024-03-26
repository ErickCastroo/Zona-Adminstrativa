import React, { useState } from "react";
import image from '../../assets/images/LoginImage.png';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext/useAuth";

function Login() {
  const { login } = useAuth();
  // Estado para almacenar la respuesta de la petición
  // Estados para el correo y contraseña del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Función para la navegación entre páginas
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await login(email, password);
    
    } catch (error) {
      console.error("Error al realizar la petición:", error.message);
    }
  };


  // Función que maneja el envío del formulario
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Evita que el formulario se envíe automáticamente

  //   try {
  //     // Realiza la petición POST al servidor para iniciar sesión
  //     const response = await fetch('http://localhost/fastapi/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         //'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYXRyaWN1bGEiOjEyMzQ1Njc4LCJyb2wiOlsxXSwiZXhwIjoxNzA2MjU0Mjg3fQ.10JD10jwfoXPn3kNa4pX0x70HGTEtW1ywOiy5gW24YU'
  //       },
  //       body: JSON.stringify({
  //         correo: email,
  //         password: password,
  //       }),
  //     });

  //     if (!response.ok) {
  //       // Lanza un error si la respuesta no es exitosa
  //       throw new Error(`Error en la petición: ${response.status}`);
  //     }
      
  //     // Parsea la respuesta a formato JSON
  //     const jsonData = await response.json();
  //     // Actualiza el estado con los datos recibidos
      

  //     // Navega a la página principal
  //     navigate('/', { state: { token: jsonData.token } });
  //     // Muestra en consola el token de acceso (puedes personalizar este manejo según tus necesidades)
  //     // console.log("Token de acceso:", jsonData.token);
  //   } catch (error) {
  //     // Captura cualquier error durante el proceso
  //     console.error('Error al realizar la petición:', error.message);
  //   }
  // };

  return (
    <div
      className="h-screen flex items-center justify-center"
      style={{ background: "linear-gradient(-45deg, #0396FF, #F9F6F2 85%)" }}
    >
      <div className="flex w-3/4 max-w-4xl mx-auto bg-white rounded shadow-lg overflow-hidden h-1/2">
        <div className="w-1/2 h-full">
          <img
            className="h-full w-full object-cover"
            src={image}
            alt="Imagen de fondo"
          />
        </div>
        

        <div className="w-1/2 p-12 h-full flex items-center justify-center">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">
              Iniciar Sesión como Administrador
            </h1>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Iniciar sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export { Login };
