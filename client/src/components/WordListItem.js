import React, { useContext } from "react";
import wordContext from "../context/word/wordContext";

export default function WordListItem({ word }) {
  const WordContext = useContext(wordContext);
  const { setCurrent } = WordContext;

  return (
    <li
      key={word._id}
      onClick={() => setCurrent(word)}
      className="list-group-item text-left"
    >
      {word.term}
    </li>
  );
}
