import React, { useState } from "react";
import Modal from "../../index";

function ModalResCrear({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Crear Respuesta</h1>
    </Modal>
  );
}

export { ModalResCrear };
