import React, { useState } from "react";
import Modal from "../../index";

function ModalEditarPasos({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Editar Pasos</h1>
    </Modal>
  );
}

export { ModalEditarPasos };
22;
