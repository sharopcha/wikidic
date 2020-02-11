import React, { useContext, useEffect } from "react";
import Drawer from "./Drawer";

import WordContext from "../../context/word/wordContext";
import SuggetedWordsDrawer from "./SuggetedWordsDrawer";

export default function SuggestedWords() {
  const wordContext = useContext(WordContext);
  const { getSuggestWords, suggestWords } = wordContext;

  useEffect(() => {
    getSuggestWords();

    if (suggestWords === null) {
      return <h5>There is no suggested definitions</h5>;
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-3">
      <SuggetedWordsDrawer words={suggestWords} />
    </div>
  );
}
