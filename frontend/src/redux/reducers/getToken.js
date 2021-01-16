import { GET_TOKEN } from "../actions/types";

//Počáteční state
const initialState = {};

//Reducer
export default function (state = initialState, action) {
  //Reducer vykoná příslušnou akci
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    //Pokud se spustí jiná akce, reducer vrátí počáteční state
    default:
      return state;
  }
}
