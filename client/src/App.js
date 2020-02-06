import React, { Component } from "react";
import WordState from "./context/word/wordState";

import Navbar from "./components/Navbar";
import WordList from "./components/WordList";
import Word from "./components/Word";
import "./App.css";

class App extends Component {
  render() {
    return (
      <WordState>
        <Navbar />
        <div className="container mt-1">
          <div className="row">
            <div className="col-5 ">
              <WordList />
            </div>
            <div className="col-7 ">
              <Word />
            </div>
          </div>
        </div>
      </WordState>
    );
  }
}

export default App;
