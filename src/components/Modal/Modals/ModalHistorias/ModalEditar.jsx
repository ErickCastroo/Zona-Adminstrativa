import React, { useState } from "react";
import Modal from "../../index";

function ModalEditarHistorias({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Editar Historia</h1>
    </Modal>
  );
}

export { ModalEditarHistorias };
