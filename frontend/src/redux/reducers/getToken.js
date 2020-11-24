import { GET_TOKEN, GET_USER } from "../actions/types";

const initialState = {
  tokens: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOKEN:
      console.log("cojetypíčo");
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
