import { GET_WORDS, FILTER_WORDS, CLEAR_FILTER } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
        words: action.payload,
        loading: false
      };

    case FILTER_WORDS:
      return {
        ...state,
        filtered: state.words.filter(word => {
          const regex = new RegExp(`${action.payload}`, "gi");
          console.log();
          return word.term.term.match(regex);
        })
      };

    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
  }
};
