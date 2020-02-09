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
    suggestNewWord,
    current
  } = WordContext;

  const [word, setWord] = useState({
    term: "",
    definition: "",
    name: "",
    email: ""
  });

  const onChange = e => {
    setWord({ ...word, [e.target.name]: e.target.value });
  };

  const { term, definition, email, name } = word;

  const onSubmit = e => {
    e.preventDefault();

    let fullName = name.split(" ");

    const newterm = {
      term,
      definition: {
        title: definition,
        createdBy: {
          lastName: fullName[0],
          firstName: fullName[1],
          email
        }
      },
      created: {
        lastName: fullName[0],
        firstName: fullName[1],
        email
      }
    };

    if (modal.dest === "Definition") {
      const {
        definition: {
          title,
          createdBy: { lastName, firstName, email }
        }
      } = newterm;
      if (!title || !lastName || !firstName || !email) {
        console.log("all the fields must be filled");
        closeModal();
      } else {
        const newterm = {
          createdBy: newterm.definition.createdBy,
          termID: current._id,
          definition: title
        };
        addNewDefinition(newterm);
      }
    }

    if (modal.dest === "Navbar") {
      const {
        term,
        definition: { title },
        created: { lastName, firstName, email }
      } = newterm;
      if (!title || !lastName || !firstName || !email || !term) {
        console.log("all the fields must be filled");
        closeModal();
      } else {
        suggestNewWord(newterm);
        // console.log(newterm);
      }
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
        {modal.dest === "Navbar" ? "ADD NEW WORD" : "ADD NEW DEFINITION"}
      </ModalHeader>
      <ModalBody>
        <div className="form-group">
          {modal.dest === "Navbar" && (
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
