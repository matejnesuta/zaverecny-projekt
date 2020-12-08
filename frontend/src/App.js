import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/Main";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Verification from "./components/Verification";
import Profile from "./components/Profile";
import Groups from "./components/Groups";
import Task from "./components/Task";
import UserPage from "./components/UserPage";
import PasswordReset from "./components/PasswordReset";
import Page404 from "./components/Page404";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/verification" component={Verification} />
          <Route path="/profile" component={Profile} />
          <Route path="/groups" exact component={Groups} />
          <Route path="/groups/:id" component={Main} />
          <Route path="/logs/:id" component={Task} />
          <Route path="/users/:id" component={UserPage} />
          <Route path="/passwordreset" component={PasswordReset} />
          <Route path="/" component={Page404} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
