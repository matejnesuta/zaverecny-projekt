import { combineReducers } from "redux";
import getToken from "./getToken";
import getUser from "./getUser";

const initialState = {};

export default combineReducers({
  tokens: getToken,
  users: getUser,
});
