import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Verification from "./components/Verification";
import Profile from "./components/Profile";
import Groups from "./components/Groups";
import PasswordReset from "./components/PasswordReset";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/verification" component={Verification} />
          <Route path="/profile" component={Profile} />
          <Route path="/groups" component={Groups} />
          <Route path="/passwordreset" component={PasswordReset} />
          <Route exact path="/" component={Main} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
