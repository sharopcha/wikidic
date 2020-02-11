import React, { useContext, useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import WordContext from "../context/word/wordContext";
import AuthContext from "../context/auth/authContext";

export default function ModalForm() {
  const wordContext = useContext(WordContext);
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const {
    modal,
    closeModal,
    openModal,
    addNewDefinition,
    addNewDefinitionSuggestion,
    addNewWord,
    suggestNewWord,
    current,
    getWords
  } = wordContext;

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

    const newterm = {
      term,
      definition: {
        title: definition,
        createdBy: {
          name,
          email
        }
      },
      created: {
        name,
        email
      }
    };

    // ---------------DEFINITION--------------------------------------//

    if (modal.dest === "Definition") {
      const newDefinition = {
        createdBy: {
          name,
          email
        },
        definition: word.definition,
        termID: current._id,
        term: current.term
      };

      const { createdBy, definition } = newDefinition;

      if (!definition) {
        console.log("all the fields must be filled");
        closeModal();
      } else {
        if (user) {
          createdBy.name = user.name;
          createdBy.email = user.email;

          console.log(newDefinition.definition);
          addNewDefinition(newDefinition);
          // getWords();
          closeModal();
        }

        // if (!createdBy.name || !createdBy.email) {
        //   alert("all the fields must be filled");
        // } else {
        //   addNewDefinitionSuggestion(newDefinition);
        //   closeModal();
        // }
      }
    }
    // -------------------------------------------------------------------------//

    // ----------------NAVBAR---------------------------------------------------//

    if (modal.dest === "Navbar") {
      const {
        term,
        definition: { title, createdBy },
        created: { name, email }
      } = newterm;
      if (!title || !term) {
        console.log("all the fields must be filled");
      } else {
        if (user) {
          newterm.approved = true;
          newterm.created.name = user.name;
          newterm.created.email = user.email;
          addNewWord(newterm);
        }
        if (!name || !email) {
          console.log("all the fields must be filled");
        } else {
          newterm.created.name = name;
          newterm.created.email = email;
          createdBy.name = name;
          createdBy.email = email;
          suggestNewWord(newterm);
        }
        // console.log(newterm);
      }
    }
    getWords();
    closeModal();
  };
  // --------------------------------------------------------------------//

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
          {!user && (
            <Fragment>
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
            </Fragment>
          )}
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
