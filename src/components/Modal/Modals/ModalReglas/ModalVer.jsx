import React, { useState } from "react";
import Modal from "../../index";

function ModalVerReglas({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Ver Reglas</h1>
    </Modal>
  );
}

export { ModalVerReglas };
