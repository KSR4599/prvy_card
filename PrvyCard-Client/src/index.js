import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, BrowserRouter, Switch } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";
import Home from "./components/Home";
import Login from "./components/Login";
import Account from "./components/Account";
import Admin from "./components/Admin";
import Profile from "./components/Profile";
import DisplayProfile from "./components/DisplayProfile";
import ProtectedRoute from './ProtectedRoute'

import { createBrowserHistory } from "history";

const history = createBrowserHistory({ forceRefresh: true });
ReactDOM.render(
  <Router history={history}>
      <div>
        <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login}/>
      <Route exact path="/account" component={Account}/>
      <Route exact path ="/admin" component={Admin}/>
      <Route exact path="/profile/:username/" component={Profile}/>
      <ProtectedRoute exact path="/DisplayProfile/:username/" component={DisplayProfile}/>
      </Switch>
      </div>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();