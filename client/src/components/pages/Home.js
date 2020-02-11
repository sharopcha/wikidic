import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";
import WordList from "../WordList";
import Word from "../Word";

export default function Home() {
  const authContext = useContext(AuthContext);
  const { user, isAuthenticated } = authContext;

  useEffect(() => {
    if (user && isAuthenticated) {
      <Redirect to="/admin" />;
    }
  });

  return (
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
    </div>
  );
}
