import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavMenu } from './componentsPage/NavMenu';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {EstadisticasUsuarios} from './componentsPage/estadisticasUsuarios';
import {TablaEntrenadores} from './componentsPage/pruebaDataTable';

function Dasboard() {
  const location = useLocation();
  const { token } = location.state || "";
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        if (!token || token === "") {
          console.error("no existe el token");
          return;
        }

        const response = await fetch("http://localhost/fastapi/usuarios", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          // Lanza un error si la respuesta no es exitosa
          throw new Error(`Error en la petición: ${response.status}`);
        }

        // Parsea la respuesta a formato JSON
        const jsonData = await response.json();
        setUsuarios(jsonData);
        console.log(jsonData);
        // Actualiza el estado con los datos recibidos
      } catch (error) {
        console.log(error);
      }
    };

    obtenerUsuarios();
  }, [token]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4">
        {/* Contenido principal, como el componente NavMenu */}
        <NavMenu />
        <div className="flex flex-col gap-4">
          <EstadisticasUsuarios />
          <div className="flex flex-row gap-4">
            {/* Agrega el contenido adicional aquí */}
          </div>
          <div className="flex flex-row gap-4">
            <TablaEntrenadores />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  
}

export { Dasboard };
