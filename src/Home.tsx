import React, { Component } from "react";
import "./styles.css";

class Home extends Component<any, any> {
  render() {
    return (
      <div>
        <div className="container-text">
          Welcom to GitHub Analyser. Authenticate yourself before we start.
        </div>
        <div className="container">
          <button onClick={this.props.auth.login} className="button">
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
