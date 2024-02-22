import React, { useState } from "react";
import Modal from "../../index";

function ModalResBorrar({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Borrar Respuesta</h1>
    </Modal>
  );
}

export { ModalResBorrar };
