import React, { useState } from "react";
import Modal from "../../index";

function ModalResVer({ closeModal }) {
  const [active, setActive] = useState(true);

  const toggle = () => {
    setActive(!active);
    closeModal();
  };

  return (
    <Modal active={active} toggle={toggle}>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold text-black dark:text-white">
          Borrar Respuestas
        </h1>
      </div>
    </Modal>
  );
}

export { ModalResVer };
