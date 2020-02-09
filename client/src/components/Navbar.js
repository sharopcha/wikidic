import React, { Fragment, useContext, useEffect } from "react";
import WordContext from "../context/word/wordContext";
import AuthContext from "../context/auth/authContext";

import ModalForm from "./ModalForm";

const Navbar = () => {
  // const [modal, setModal] = useState(false);
  const wordContext = useContext(WordContext);
  const authContext = useContext(AuthContext);

  const { isAuthenticated, loadUser, logout } = authContext;
  const { openModal } = wordContext;

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <nav className="navbar navbar-expand-md navbar-light  bg-light">
        <a className="navbar-brand" href="/">
          LT | Course Glossary
        </a>
        <a onClick={() => openModal("Navbar")} className="nav-link">
          Add new Word
        </a>

        {isAuthenticated && (
          <button
            className="btn btn-outline-success mx-2 ml-auto my-sm-0 "
            type="submit"
            onClick={() => logout()}
          >
            Logout
          </button>
        )}
      </nav>

      <ModalForm />
      {/* ------------- ADD NEW WORD MODAL FORM ------------------------------------------ */}
    </Fragment>
  );
};

export default Navbar;
