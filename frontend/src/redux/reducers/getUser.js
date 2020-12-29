import { GET_USER } from "../actions/types";
import user_icon from "../../images/user_icon.jpg";

//Defaultní stav
const initialState = {
  user: {
    id: 17,
    firstName: "Franta",
    lastName: "Brambor",
    imageSrc: user_icon,
    comment:
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
