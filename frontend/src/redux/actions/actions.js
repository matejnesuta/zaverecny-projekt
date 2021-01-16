import { GET_TOKEN, GET_USER, GET_IMAGE, UPDATE_USER } from "./types";

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

//Akce, sloužící k nahrání obrázku do storu (pouze zkušební, přemění se v nastavení profilu)
export const getImage = (image) => ({
  type: GET_IMAGE,
  payload: image,
});
