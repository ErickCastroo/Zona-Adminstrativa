import React, { useState } from "react";
import Modal from "../../index";

function ModalCrearHistorias({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Crear Historia</h1>
    </Modal>
  );
}

export { ModalCrearHistorias };
