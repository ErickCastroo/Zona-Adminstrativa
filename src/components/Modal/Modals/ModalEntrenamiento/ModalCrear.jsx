import React, { useState } from "react";
import Modal from "../../index";

function ModalCrearEntrenamiento({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Crear Entrenamiento</h1>
    </Modal>
  );
}

export { ModalCrearEntrenamiento };
