import { GET_TOKEN, GET_USER, GET_IMAGE } from "./types";

export const getToken = (token) => ({
  type: GET_TOKEN,
  payload: token,
});

export const getUser = (user) => ({
  type: GET_USER,
  payload: user,
});

export const getImage = (image) => ({
  type: GET_IMAGE,
  payload: image,
});
