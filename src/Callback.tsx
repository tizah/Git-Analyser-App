import React, { Component } from "react";

class Callback extends Component<any> {
  componentDidMount() {
    //handle authentication if expected values are in the url.
    if (
      /access_token|id_token|error/.test(this.props.auth.history.location.hash)
    ) {
      this.props.auth.handleAuthentication();
    } else {
      throw new Error("Invalid callback URL.");
    }
    //console.log();
  }
  render() {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
}

export default Callback;
