import React, { useContext, useEffect } from "react";
import WordContext from "../context/word/wordContext";

export default function WordList() {
  const wordContext = useContext(WordContext);

  const { words, filtered, getWords, loading } = wordContext;

  useEffect(() => {
    getWords();
  });

  return (
    <div className="words mx-3 pt-3">
      <div className="">
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
            />
            <div className="input-group-append">
              <div className="input-group-text">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2  word-list">
        <ul className="list-group">
          {words !== null && words.length !== 0 && !loading
            ? words.map(word => {
                return (
                  <li className="list-group-item text-left">
                    {word.term.term}
                  </li>
                );
              })
            : "No words are added"}
          {/* {words.map(word => {
            console.log(word);
          })} */}
        </ul>
      </div>
    </div>
  );
}
