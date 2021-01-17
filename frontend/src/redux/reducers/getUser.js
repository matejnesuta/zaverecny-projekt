import { GET_USER } from "../actions/types";
import user_icon from "../../images/user_icon.jpg";

//Defaultní stav

//PŘEPIŠ SI TO, DEBÍLKU
const initialState = {
  user: {
    id: 17,
    first_name: "Franta",
    last_name: "Brambor",
    profile_pic: user_icon,
    bio:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis p",
  },
};

//Reducer
export default function (state = initialState, action) {
  //Reducer vykoná příslušnou akci
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    //Pokud se spustí jiná akce, reducer vrátí defaultní stav
    default:
      return state;
  }
}
