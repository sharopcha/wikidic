import React, { useState, useContext, useEffect } from "react";
import ModalForm from "./ModalForm";
import wordContext from "../context/word/wordContext";

export default function Word() {
  // const [current, setCurrentWord] = useState(null);
  const WordContext = useContext(wordContext);
  const { current, words, openModal, deleteTerm, setCurrent } = WordContext;

  useEffect(() => {
    if (current !== null) {
      // setCurrent();
    }
  });
  return (
    <div className="pt-3">
      <div className="card p-3">
        <div className="card-body row">
          {current === null ? (
            <h5>Add new words and their definition...</h5>
          ) : (
            <h4 className="card-title ml-3">{current.term}</h4>
          )}

          {/* TO DO 
            Need to be inplemented when user authenticated
          */}
          {current && (
            <a
              onClick={() => {
                if (current._id !== null) openModal("Definition");
              }}
              className="btn btn-outline-success text-right ml-auto"
            >
              New definition
            </a>
          )}
          <i
            className="fas fa-trash-alt text-right ml-auto mr-3"
            onClick={() => deleteTerm(current._id)}
          ></i>
        </div>
        <ModalForm />

        {/* -------------------DEFINITION SECTION--------------------------------------- */}
        {current &&
          current.definition.map((def, i) => {
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
