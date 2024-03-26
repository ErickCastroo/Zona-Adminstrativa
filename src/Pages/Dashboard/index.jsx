import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {EstadisticasUsuarios} from './componentsPage/estadisticasUsuarios';
import {DataTable} from './componentsPage/DataTable';
import { TrabajadorDes } from "./componentsPage/Trabajador destacado";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import { primeraMayuscula } from "@/lib/utils";

function Dashboard() {
  const { usuario } = useAuth();

console.log(usuario)
  return (
  
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow p-4">
        {/* Contenido principal, como el componente NavMenu */}
        {/* <NavMenu /> */}
        <div className="flex flex-col gap-4">
          <EstadisticasUsuarios />
          <div className="flex flex-row gap-4">
            <DataTable />
            <TrabajadorDes />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  
}

export { Dashboard };
