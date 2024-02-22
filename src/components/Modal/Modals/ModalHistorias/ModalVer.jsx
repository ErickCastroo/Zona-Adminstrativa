import React, { useState } from "react";
import Modal from "../../index";

function ModalVerHistorias({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <h1>ver Historia</h1>
    </Modal>
  );
}

export { ModalVerHistorias };
