import React, { useContext, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import wordContext from "../context/word/wordContext";

export default function ModalForm() {
  const WordContext = useContext(wordContext);
  const {
    modal,
    closeModal,
    openModal,
    addNewDefinition,
    current
  } = WordContext;
  const [word, setWord] = useState({
    term: "",
    definition: "",
    synonm: "",
    name: "",
    email: ""
  });

  const { term, definition, synonm, email, name } = word;

  const onChange = e => {
    setWord({ ...word, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    let related = synonm.split(" ");
    let fullName = name.split(" ");

    const newterm = {
      definition,
      createdBy: {
        lastName: fullName[0],
        firstName: fullName[1],
        email
      }
    };

    if (modal.dest == "Definition") {
      newterm.termID = current._id;
      addNewDefinition(newterm);
    }

    closeModal();
  };

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
        {modal.dest == "Navbar" ? "ADD NEW WORD" : "ADD NEW DEFINITION"}
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          {modal.dest == "Navbar" && (
            <input
              onChange={onChange}
              type="text"
              name="term"
              className="form-control mb-2"
              placeholder="New word..."
            />
          )}
          <textarea
            onChange={onChange}
            type="text"
            name="definition"
            placeholder="Definition goes here..."
            cols="20"
            rows="3"
            className="form-control mb-3"
          ></textarea>
          {modal.des == "Navbar" && (
            <textarea
              onChange={onChange}
              type="text"
              name="synonm"
              placeholder="Related words..."
              cols="20"
              rows="2"
              className="form-control mb-3"
            ></textarea>
          )}

          <div className="dropdown-divider mb-3"></div>
          <input
            onChange={onChange}
            type="text"
            name="name"
            className="form-control mb-2"
            placeholder="Your name"
          />
          <input
            onChange={onChange}
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
        <Button color="primary" onClick={onSubmit}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
}
