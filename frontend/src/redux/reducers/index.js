import { combineReducers } from "redux";
import getToken from "./getToken";
import getUser from "./getUser";
import getImage from "./getImage";

//Defaultní stav
const initialState = {};

//Spojení jednotlivých reducerů metodou combineReducers
export default combineReducers({
  token: getToken,
  user: getUser,
  image: getImage,
});
