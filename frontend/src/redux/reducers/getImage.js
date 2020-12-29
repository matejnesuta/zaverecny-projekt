import { GET_IMAGE } from "../actions/types";

//Defaultní stav
const initialState = {};

//Reducer
export default function (state = initialState, action) {
  //Reducer vykoná příchozí akci
  switch (action.type) {
    case GET_IMAGE:
      return {
        ...state,
        image: action.payload,
      };
    //Pokud se spustí jiná akce, reducer vrátí defaultní stav
    default:
      return state;
  }
}
