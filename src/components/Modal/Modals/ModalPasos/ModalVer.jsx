import React, { useState } from "react";
import Modal from "../../index";

function ModalVerPasos({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Ver Pasos</h1>
    </Modal>
  );
}

export { ModalVerPasos };
