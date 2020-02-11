import React, { useContext, useEffect } from "react";

import WordContext from "../../context/word/wordContext";
import SuggetedWordsDrawer from "./SuggetedWordsDrawer";

export default function SuggestedWords() {
  const wordContext = useContext(WordContext);
  const { words, getWords } = wordContext;

  useEffect(() => {
    getWords();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-3">
      {words === null ? (
        <h5>There is no suggested definitions</h5>
      ) : (
        <SuggetedWordsDrawer
          words={words.filter(i => {
            let filtered;
            return (filtered = i.approved === false);
          })}
        />
      )}
    </div>
  );
}
