import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Registration from "./Registration";
import Verification from "./Verification";
import Profile from "./Profile";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/verification" component={Verification} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
