import React, { useState } from "react";
import Modal from "../../index";

function ModalVerPasosR({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>Ver PasosRegas</h1>
    </Modal>
  );
}

export { ModalVerPasosR };
2