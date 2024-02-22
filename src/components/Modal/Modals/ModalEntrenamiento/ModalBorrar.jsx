import React, { useState } from "react";
import Modal from "../../index";

function ModalBorrarEntrenamiento({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Borrar Entrenamiento</h1>
    </Modal>
  );
}

export { ModalBorrarEntrenamiento };
