import { GET_WORDS } from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_WORDS:
      return {
        ...state,
        words: action.payload,
        loading: false
      };
  }
};
