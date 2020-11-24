import { GET_TOKEN, GET_USER } from "../actions/types";

const initialState = {
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}
