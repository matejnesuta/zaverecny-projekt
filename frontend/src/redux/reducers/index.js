import { combineReducers } from "redux";
import getToken from "./getToken";
import getUser from "./getUser";
import getImage from "./getImage";

const initialState = {};

export default combineReducers({
  token: getToken,
  user: getUser,
  image: getImage,
});
