import React, { useContext, useEffect } from "react";
import Drawer from "./Drawer";

import WordContext from "../../context/word/wordContext";

export default function SuggestedDefinitions() {
  const wordContext = useContext(WordContext);
  const { getDefs, suggestDefs } = wordContext;

  useEffect(() => {
    // getDefs();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container mt-3">
      {suggestDefs === null ? (
        <h5>There is no suggested definitions</h5>
      ) : (
        <Drawer word={suggestDefs} />
      )}
    </div>
  );
}
