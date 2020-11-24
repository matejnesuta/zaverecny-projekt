import { GET_TOKEN, GET_USER } from "./types";

export const getUser = () => (dispatch) => {
  /*axios
    .post(
      "/auth/login/",
      { email: this.state.email, password: this.state.password },
      { withCredentials: true }
    )
    .then((response) => {
      console.log(response);
    })
    .then((data) =>
      dispatch({
        type: GET_TOKEN,
        payload: data,
      })
    )
    .catch((error) => {
      this.setState({
        error: error,
      });
      console.log(error);
    });*/
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) =>
      dispatch({
        type: GET_USER,
        payload: data,
      })
    );
};
