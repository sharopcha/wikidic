import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WordState from "./context/word/wordState";
import AuthState from "./context/auth/authState";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import "./App.css";

const App = () => {
  return (
    <AuthState>
      <WordState>
        <Router>
          <Fragment>
            <Navbar />
            <div className="container mt-1">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </WordState>
    </AuthState>
  );
};

export default App;
