import {
  GET_WORDS,
  FILTER_WORDS,
  CLEAR_FILTER,
  SET_CURRENT,
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_NEW_DEFINITION,
  ADD_WORD,
  GET_DEFINITIONS,
  DELETE_WORD
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_WORDS:
      const firstDef = action.payload.filter(i => i.approved === true);
      return {
        ...state,
        words: action.payload,
        current: firstDef[0],
        loading: false
      };

    case GET_DEFINITIONS:
      return {
        ...state,
        suggestDefs: action.payload,
        loading: false
      };

    case ADD_NEW_DEFINITION: {
      return {
        ...state,
        notification: action.payload
      };
    }

    case ADD_WORD:
      return {
        ...state,
        words: [...action.payload, ...state.words],
        loading: false
      };

    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };

    case FILTER_WORDS:
      return {
        ...state,
        filtered: state.words
          .filter(i => i.approved === true)
          .filter(word => {
            const regex = new RegExp(`${action.payload}`, "gi");
            console.log();
            return word.term.match(regex);
          })
      };

    case DELETE_WORD:
      const filtered = state.words.filter(word => word._id !== action.payload);
      const currentDef = state.words.filter(i => i.approved === true);
      return {
        ...state,
        words: filtered,
        current: currentDef[0]
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };

    case OPEN_MODAL:
      return {
        ...state,
        modal: {
          isOpen: true,
          dest: action.payload
        }
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modal: {
          isOpen: false,
          dest: ""
        }
      };

    default:
      return state;
  }
};
