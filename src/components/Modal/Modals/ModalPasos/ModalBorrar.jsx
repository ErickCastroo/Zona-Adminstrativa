import React, { useState } from "react";
import Modal from "../../index";

function ModalBorrarPasos({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Borrar Pasos</h1>
    </Modal>
  );
}

export { ModalBorrarPasos };
