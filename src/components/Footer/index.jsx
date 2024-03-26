import React from "react";
import { useAuth } from "@/contexts/AuthContext/useAuth";

function Footer() {
  const { usuario } = useAuth();
  return (
    <>
      <footer className="bg-slate-900 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; 2024 Chat-Bot. Derechos reservados.
        </p>
      </div>
    </footer>
    
    
    </>
  )
}

export { Footer };
