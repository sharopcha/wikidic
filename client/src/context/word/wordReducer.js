import {
  GET_WORDS,
  FILTER_WORDS,
  CLEAR_FILTER,
  SET_CURRENT,
  OPEN_MODAL,
  CLOSE_MODAL,
  ADD_NEW_DEFINITION,
  ADD_WORD
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
        words: action.payload.filter(word => {
          return word.approved === true;
        }),
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
        filtered: state.words.filter(word => {
          const regex = new RegExp(`${action.payload}`, "gi");
          console.log();
          return word.term.match(regex);
        })
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
  }
};
