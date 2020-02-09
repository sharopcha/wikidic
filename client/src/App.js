import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WordState from "./context/word/wordState";
import AuthState from "./context/auth/authState";
import PrivateRoute from "./components/routing/privateRoute";

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import AdminArea from "./components/pages/AdminArea";
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
                <PrivateRoute exact path="/admin" component={AdminArea} />
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
