import { GET_TOKEN, GET_USER } from "./types";

//Akce, sloužící k nahrání přihlašovacího tokenu do storu
export const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

//Akce, sloužící k nahrání informací o uživateli do storu
export const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});
