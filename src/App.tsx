import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import Auth from "./Auth/Auth";
import Home from "./Home";
import MyContribution from "./MyContribution";
import Nav from "./Nav";
import Callback from "./Callback";

class App extends Component<Auth> {
  auth: Auth;
  constructor(props: Auth) {
    super(props);
    this.auth = new Auth(this.props.history);
  }
  render() {
    return (
      <>
        <Nav />
        <Route
          path="/"
          exact
          render={props => <Home auth={this.auth} {...props} />}
        />
        <Route
          path="/callback"
          exact
          render={props => <Callback auth={this.auth} {...props} />}
        />
        <Route path="/mycontribution" component={MyContribution} />
        <Route path="/profile" component={MyContribution} />
      </>
    );
  }
}

export default App;
