import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import WordList from "../WordList";
import Word from "../Word";
import ErrorBoundary from "../../utils/ErrorBoundary";

export default function Home() {
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated } = authContext;

  useEffect(() => {});

  return (
<<<<<<< HEAD
    <div className="row">
      <div className="col-5">
        <WordList />
      </div>
      <div className="col-7 ">
        <ErrorBoundary>
          <Word />
        </ErrorBoundary>
      </div>
=======
    <div>
      {user && isAuthenticated ? (
        <Redirect to="/admin" />
      ) : (
        <div className="row">
          <div className="col-5">
            <WordList />
          </div>
          <div className="col-7 ">
            <Word />
          </div>
        </div>
      )}
>>>>>>> c34d2ef
    </div>
  );
}
