import React, { useState, useContext, useEffect } from "react";
import ModalForm from "./ModalForm";
import wordContext from "../context/word/wordContext";

export default function Word() {
  const [currentWord, setCurrentWord] = useState(null);
  const WordContext = useContext(wordContext);
  const { current, words, openModal } = WordContext;

  useEffect(() => {
    if (current !== null) {
      setCurrentWord(words[0]);
    }
  });
  return (
    <div className="pt-3">
      <div className="card p-3">
        <div className="card-body row">
          {currentWord ? (
            <h4 className="card-title ml-3">{currentWord.term}</h4>
          ) : (
            <h5>Add new words and their definition...</h5>
          )}

          {/* TO DO 
            Need to be inplemented when user authenticated
          */}
          {currentWord && (
            <a
              onClick={() => {
                if (currentWord._id !== null) openModal("Definition");
              }}
              className="btn btn-outline-success text-right ml-auto"
            >
              New definition
            </a>
          )}
          {/* <i className="fas fa-edit text-right ml-auto mr-3"></i>
          <i className="fas fa-trash-alt   mr-3"></i> */}
        </div>
        <ModalForm />

        {/* -------------------DEFINITION SECTION--------------------------------------- */}
        {currentWord &&
          currentWord.definition.map((def, i) => {
            return (
              <div key={i} className="definition ml-5 mb-3">
                <div className="card-body">
                  <div className="card-text">{def.title}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
