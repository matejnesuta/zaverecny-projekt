import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";

//Defaultní stav storu
const initialState = {};

//Rozšíření storu
const middleware = [thunk];

//Vytvoření storu metodou createStore, který příjmá spojení reducerů v podobě rootReducer, defaultní stav a rozšíření
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
