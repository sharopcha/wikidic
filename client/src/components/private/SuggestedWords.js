import React, { useContext, useEffect } from "react";

import WordContext from "../../context/word/wordContext";
import SuggetedWordsDrawer from "./SuggetedWordsDrawer";

export default function SuggestedWords() {
  const wordContext = useContext(WordContext);
  const { getSuggestWords, suggestWords } = wordContext;

  useEffect(() => {
    getSuggestWords();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-3">
      {suggestWords === null ? (
        <h5>There is no suggested definitions</h5>
      ) : (
        <SuggetedWordsDrawer words={suggestWords} />
      )}
    </div>
  );
}
