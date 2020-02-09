import React, { Fragment, useContext } from "react";
import wordContext from "../context/word/wordContext";

import ModalForm from "./ModalForm";

const Navbar = () => {
  // const [modal, setModal] = useState(false);
  const WordContext = useContext(wordContext);
  const { openModal } = WordContext;

  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-light  bg-light">
        <a className="navbar-brand" href="#">
          LT | Course Glossary
        </a>
        <a onClick={() => openModal("Navbar")} className="nav-link">
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

      {/* For adding new words we need field. 
        They are:
          Modal Header,
          New Term Input,
          Submit Button type
      */}
      <ModalForm />
      {/* ------------- ADD NEW WORD MODAL FORM ------------------------------------------ */}
    </Fragment>
  );
};

export default Navbar;
