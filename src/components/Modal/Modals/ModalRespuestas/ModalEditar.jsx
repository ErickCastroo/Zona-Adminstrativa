import React, { useState } from "react";
import Modal from "../../index";

function ModalResEditar({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Editar Respuesta</h1>
    </Modal>
  );
}

export { ModalResEditar };
