import React, { useState } from "react";
import Modal from "../../index";

function ModalCrearReglas({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Crear Reglas</h1>
    </Modal>
  );
}

export { ModalCrearReglas };
