import React, { useState, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import AddNewWord from "./AddNewWord";

const Navbar = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-light  bg-light">
        <a className="navbar-brand" href="#">
          LT | Course Glossary
        </a>
        <a onClick={toggle} className="nav-link">
          Add new Word
        </a>
        <button
          className="btn btn-outline-success mx-2 my-sm-0 ml-auto"
          type="submit"
        >
          Login
        </button>
        <button className="btn btn-outline-success mx-2 my-sm-0 " type="submit">
          Logout
        </button>
      </nav>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add new word</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <input
              type="text"
              name="word"
              className="form-control mb-2"
              placeholder="New word..."
            />
            <textarea
              name="definition"
              placeholder="Definition goes here..."
              cols="30"
              rows="3"
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
          <Button color="primary" onClick={toggle}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </Fragment>
  );
};

export default Navbar;
