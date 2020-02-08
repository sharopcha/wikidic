import React, { useContext, useEffect, useRef, Fragment } from "react";
import WordContext from "../context/word/wordContext";
import WordListItem from "./WordListItem";

export default function WordList() {
  const wordContext = useContext(WordContext);
  const text = useRef("");

  const {
    words,
    filtered,
    filterWords,
    clearFilter,
    getWords,
    setCurrent,
    loading
  } = wordContext;

  useEffect(() => {
    getWords();
    if (words !== null && words.length === 0 && !loading) {
      return <h5>No Words Added Yet!</h5>;
    }
    if (filtered === null) {
      text.current.value === "";
    }
    // eslin-disable-next-line
  }, []);

  const onChange = e => {
    if (text.current.value !== "") {
      filterWords(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <div className="words mx-3 pt-3">
      <div className="">
        <div className="form-group">
          <div className="input-group">
            <input
              ref={text}
              onChange={onChange}
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
          {words !== null && !loading ? (
            <Fragment>
              {filtered !== null
                ? filtered.map(word => {
                    return <WordListItem key={word._id} word={word} />;
                  })
                : words.map(word => {
                    return <WordListItem key={word._id} word={word} />;
                  })}
            </Fragment>
          ) : (
            <h5>Please Add new words...</h5>
          )}
        </ul>
      </div>
    </div>
  );
}
