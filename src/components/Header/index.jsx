import React, { useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import logo from "@/assets/images/logo&slogan.png";
import { useAuth } from "@/contexts/AuthContext/useAuth";
import { NavMenu } from "@/Pages/Dashboard/componentsPage/NavMenu";
import { Switch } from "@/Pages/Dashboard/componentsPage/swichPageColor";

const Header = () => {
  const { usuario } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Agrega la lógica para manejar los datos del formulario (correo y contraseña)
    // Puedes enviar los datos al servidor o realizar otras acciones según tus necesidades.
  };

  const auth = useAuth()
  const handleLogout = () => {
    auth.logout();
  };

  return (
    <div className="flex justify-between items-center p-3 bg-slate-800    dark:bg-slate-900  dark: text-slate-900">
      {/* Logo a la izquierda */}

      <div className="w-1/12">
        {/* <img src='logo' alt="Logo" className="w-full h-auto" /> */}
        <Switch />
      </div>
      <NavMenu />
      {/* Ícono de perfil a la derecha */}
      <Dialog>
        <DialogTrigger>
          <Avatar className="w-12 h-12 lg:w-10 lg:h-10 xl:w-20 xl:h-20">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="cursor-pointer rounded-full w-full h-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edita tu perfil</DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Esto modificará permanentemente
              tu cuenta y eliminará tus datos de nuestros servidores.
            </DialogDescription>
          </DialogHeader>

          {/* Formulario dentro del diálogo */}
          <form onSubmit={handleFormSubmit} className="flex flex-col">
            <div className="flex mb-2">
              <label className="w-1/4 mr-1">Correo</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                className="border border-gray-400 p-2 rounded-md flex-grow dark:text-slate-200 dark:bg-slate-800  dark:placeholder-slate-900"
              />
            </div>
            <div className="flex mb-2">
              <label className="w-1/4 mr-1">Contraseña</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={handlePasswordChange}
                className="border  dark:text-slate-200 dark:bg-slate-800  dark:placeholder-slate-900 border-gray-400 p-2 rounded-md flex-grow"
              />
            </div>
            <div className="flex row-auto justify-between p-3">
              <button onClick={handleLogout} className=" bg-blue-500 text-white p-2 rounded-md hover:bg-red-600 w-48 self-start ">
                Logout 
              </button>
  
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 w-48 self-end"
              >
                Guardar
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { Header };
