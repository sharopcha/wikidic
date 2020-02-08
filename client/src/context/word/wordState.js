import React, { useReducer } from "react";
import axios from "axios";
import WordContext from "./wordContext";
import wordReducer from "./wordReducer";
import {
  GET_WORDS,
  WORD_ERROR,
  FILTER_WORDS,
  CLEAR_FILTER,
  SET_CURRENT,
  OPEN_MODAL,
  CLOSE_MODAL
} from "../types";

const WordState = props => {
  const initialState = {
    words: null,
    current: null,
    filtered: null,
    modal: {
      isOpen: false,
      dest: null
    },
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
      dispatch({
        type: SET_CURRENT,
        payload: res.data[0]
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: WORD_ERROR
      });
    }
  };

  // Set Current Definition
  const setCurrent = word => {
    dispatch({ type: SET_CURRENT, payload: word });
  };

  // Filter Words
  const filterWords = text => {
    dispatch({ type: FILTER_WORDS, payload: text });
  };

  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // Open Modal Form
  const openModal = dest => {
    dispatch({ type: OPEN_MODAL, payload: dest });
  };

  // Close Modal Form
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  return (
    <WordContext.Provider
      value={{
        words: state.words,
        current: state.current,
        filtered: state.filtered,
        modal: state.modal,
        error: state.error,
        getWords,
        setCurrent,
        filterWords,
        clearFilter,
        openModal,
        closeModal
      }}
    >
      {props.children}
    </WordContext.Provider>
  );
};

export default WordState;
