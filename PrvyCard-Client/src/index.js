import React from "react";
import ReactDOM from "react-dom";
import { Router, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Home from "./components/Home";
import Login from "./components/Login";
import Account from "./components/Account";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import DisplayProfile from "./components/DisplayProfile";

import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });
ReactDOM.render(
  <Router history={history}>
      <div>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login}/>
      <Route exact path="/account" component={Account}/>
      <Route exact path ="/admin" component={Admin}/>
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/DisplayProfile" component={DisplayProfile}/>
      </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();