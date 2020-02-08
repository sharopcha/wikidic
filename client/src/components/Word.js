import React, { useState, useContext, useEffect } from "react";
import AddNewDefinition from "./AddNewDefinition";
import wordContext from "../context/word/wordContext";

export default function Word() {
  const [modal, setModal] = useState(false);
  const [currentWord, setCurrentWord] = useState(null);
  const WordContext = useContext(wordContext);
  const { current } = WordContext;

  useEffect(() => {
    if (current !== null) {
      setCurrentWord(current);
    }
  });

  // const { term, definition, relatedwords } = current;

  const toggle = () => setModal(!modal);

  return (
    <div className="pt-3">
      <div className="card p-3">
        <div className="card-body row">
          {currentWord && (
            <h4 className="card-title ml-3">{currentWord.term}</h4>
          )}

          {/* TO DO 
            Need to be inplemented when user authenticated
          */}
          <a
            onClick={toggle}
            className="btn btn-outline-success text-right ml-auto"
          >
            New definition
          </a>
          {/* <i className="fas fa-edit text-right ml-auto mr-3"></i>
          <i className="fas fa-trash-alt   mr-3"></i> */}
        </div>
        <AddNewDefinition modal={modal} />

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

        {currentWord && currentWord.relatedWords.length !== 0 && (
          <p className="text-center mb-1">Related words:</p>
        )}
        <div className="text-left ml-5">
          {currentWord &&
            currentWord.relatedWords.map((word, i) => {
              return (
                <span key={i} className="badge badge-secondary mr-1 p-2">
                  {word}
                </span>
              );
            })}
        </div>
      </div>
    </div>
  );
}
