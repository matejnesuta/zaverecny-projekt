import { GET_IMAGE } from "../actions/types";

const initialState = {
  image: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    default:
      return state;
  }
}
