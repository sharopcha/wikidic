import React, { useReducer } from "react";
import axios from "axios";
import WordContext from "./wordContext";
import wordReducer from "./wordReducer";
import {
  GET_WORDS,
  GET_SUGGEST_WORDS,
  WORD_ERROR,
  FILTER_WORDS,
  CLEAR_FILTER,
  SET_CURRENT,
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_NEW_DEFINITION,
  ADD_WORD,
  GET_DEFINITIONS,
  DELETE_WORD,
  DEL_SUGGEST
} from "../types";

const WordState = props => {
  const initialState = {
    suggestDefs: null,
    suggestWords: null,
    words: null,
    current: null,
    filtered: null,
    modal: {
      isOpen: false,
      dest: ""
    },
    notification: null,
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
      console.log(err);
      dispatch({
        type: WORD_ERROR
      });
    }
  };

  // Add New Definition Suggestion
  const addNewDefinitionSuggestion = async newterm => {
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const res = await axios.post("/api/suggest/definition", newterm, config);

      dispatch({
        type: ADD_NEW_DEFINITION,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: WORD_ERROR,
        payload: error.response.msg
      });
    }
  };

  const addNewDefinition = async newterm => {
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const res = await axios.put("/api/terms/definition", newterm, config);

      dispatch({
        type: ADD_NEW_DEFINITION,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: WORD_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Add New Word Suggestion
  const suggestNewWord = async newterm => {
    const config = { headers: { "Content-Type": "application/json" } };

    console.log(newterm);

    try {
      const res = await axios.post("/api/suggest/newterm", newterm, config);
      // console.log(res.data);
      dispatch({
        type: ADD_WORD,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: WORD_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Delete Suggested Definition
  const deleteDefSuggestion = async id => {
    try {
      await axios.put(`/api/suggest/${id}`);
      dispatch({
        type: DEL_SUGGEST,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: WORD_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Add New Word (Only Users Can Do)
  const addNewWord = async newterm => {
    const config = { headers: { "Content-Type": "application/json" } };

    // console.log(newterm);

    try {
      const res = await axios.post("/api/terms", newterm, config);
      console.log(res.data);
      dispatch({
        type: ADD_WORD,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: WORD_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Delete The Term
  const deleteTerm = async id => {
    try {
      await axios.delete(`/api/terms/${id}`);
      dispatch({
        type: DELETE_WORD,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: WORD_ERROR,
        payload: error.response.msg
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

  // ---------------------------- SUGGSESSTION SECTION -------------------------------------//

  // Get all Suggested Definitions
  const getDefs = async () => {
    // const config = { headers: { "Content-Type": "application/json" } };

    try {
      const res = await axios.get("/api/suggest");
      // console.log(res.data);
      dispatch({
        type: GET_DEFINITIONS,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: WORD_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Approve New Suggested Word
  const approveNewWord = async id => {
    console.log(id);
    try {
      await axios.put(`/api/terms/approve/${id}`);
      // console.log(res.data);
      getWords();
    } catch (error) {
      dispatch({
        type: WORD_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Get all Suggested Words
  const getSuggestWords = async () => {
    // const config = { headers: { "Content-Type": "application/json" } };

    try {
      const res = await axios.get("api/terms");
      const filter = res.data.filter(word => word.approved === false);
      dispatch({
        type: GET_SUGGEST_WORDS,
        payload: filter
      });
    } catch (error) {
      dispatch({
        type: WORD_ERROR,
        payload: error.response.msg
      });
    }
  };

  return (
    <WordContext.Provider
      value={{
        words: state.words,
        suggestDefs: state.suggestDefs,
        suggestWords: state.suggestWords,
        notification: state.notification,
        current: state.current,
        filtered: state.filtered,
        modal: state.modal,
        error: state.error,
        getWords,
        getSuggestWords,
        addNewDefinition,
        addNewDefinitionSuggestion,
        approveNewWord,
        addNewWord,
        suggestNewWord,
        setCurrent,
        filterWords,
        deleteTerm,
        deleteDefSuggestion,
        clearFilter,
        openModal,
        closeModal,
        getDefs
      }}
    >
      {props.children}
    </WordContext.Provider>
  );
};

export default WordState;
