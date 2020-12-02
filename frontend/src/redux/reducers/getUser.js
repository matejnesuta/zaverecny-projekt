import { GET_TOKEN, GET_USER } from "../actions/types";

const initialState = {
  users: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        name: action.payload,
      };
    default:
      return state;
  }
}
