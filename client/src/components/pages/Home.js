import React from "react";
import WordList from "../WordList";
import Word from "../Word";

export default function Home() {
  return (
    <div className="row">
      <div className="col-5 ">
        <WordList />
      </div>
      <div className="col-7 ">
        <Word />
      </div>
    </div>
  );
}
