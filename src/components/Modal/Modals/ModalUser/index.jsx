import React, { useState } from "react";
import Modal from '../../index';

function ModalUser({ closeModal }) {
  const [active, setActive] = useState(true); // Cambiado a true inicialmente, ajusta según tus necesidades
  const toggle = () => {
    setActive(!active);
    closeModal(); // Llama a la función closeModal proporcionada por el componente principal
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Crear Usuario</h1>
      <p>Crear un nuevo usuario</p>
      <form action="">
        <input type="text" placeholder="Nombre" />
        <input type="text" placeholder="Correo" />
        <input type="text" placeholder="Rol" />
        <input type="text" placeholder="Contraseña" />
        <button>Crear</button>
      </form>
    </Modal>
  );
}

export { ModalUser };
