import React, { useContext } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import wordContext from "../context/word/wordContext";

export default function ModalForm(props) {
  const WordContext = useContext(wordContext);
  const { modal, closeModal, openModal } = WordContext;

  const { newDef, newWord, NewTerm, Submit } = props;

  const toggle = () => {
    if (modal.isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  return (
    <Modal isOpen={modal.isOpen} toggle={toggle}>
      <ModalHeader>
        {(modal.dest === "Navbar" && "ADD NEW WORD") ||
          (modal.dest === "Definition" && "ADD NEW DEFINITION")}
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          {modal.dest === "Navbar" && (
            <input
              type="text"
              name="word"
              className="form-control mb-2"
              placeholder="New word..."
            />
          )}
          <textarea
            name="definition"
            placeholder="Definition goes here..."
            cols="20"
            rows="3"
            className="form-control mb-3"
          ></textarea>
          <textarea
            name="related words"
            placeholder="Related words..."
            cols="20"
            rows="2"
            className="form-control mb-3"
          ></textarea>
          <div className="dropdown-divider mb-3"></div>
          <input
            type="text"
            name="name"
            className="form-control mb-2"
            placeholder="Your name"
          />
          <input
            type="email"
            name="email"
            className="form-control "
            placeholder="Your email"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button color="primary" onClick={closeModal}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
}
