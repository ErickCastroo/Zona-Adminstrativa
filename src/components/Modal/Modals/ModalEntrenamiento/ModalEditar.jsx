import React, { useState } from "react";
import Modal from "../../index";

function ModalEditarEntrenamiento({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Editar Entrenamiento</h1>
    </Modal>
  );
}

export { ModalEditarEntrenamiento };
