import React, { useState } from "react";
import Modal from "../index";

function ModalUser({ closeModal }) {
  const [active, setActive] = useState(true); // Cambiado a true inicialmente, ajusta según tus necesidades
  const toggle = () => {
    setActive(!active);
    closeModal(); // Llama a la función closeModal proporcionada por el componente principal
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1 className="text-3xl text-black dark:text-white">Crear Usuario</h1>
      <p className="text-xl text-black dark:text-white">Crear un nuevo usuario</p>
    </Modal>
  );
}

export { ModalUser };
