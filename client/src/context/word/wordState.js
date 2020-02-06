import React, { useReducer } from "react";
import axios from "axios";
import WordContext from "./wordContext";
import wordReducer from "./wordReducer";
import { GET_WORDS, WORD_ERROR } from "../types";

const WordState = props => {
  const initialState = {
    words: null,
    current: null,
    filtered: null,
    model: false,
    error: null
  };

  const [state, dispatch] = useReducer(wordReducer, initialState);

  // Get Words
  const getWords = async () => {
    try {
      const res = await axios.get("/api/terms");

      dispatch({
        type: GET_WORDS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: WORD_ERROR,
        payload: err.response.msg
      });
    }
  };

  return (
    <WordContext.Provider
      value={{
        words: state.words,
        current: state.current,
        filtered: state.filtered,
        model: state.model,
        error: state.error,
        getWords
      }}
    >
      {props.children}
    </WordContext.Provider>
  );
};

export default WordState;
