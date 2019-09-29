import React, { Component } from "react";
import { Header } from "semantic-ui-react";

class HeaderComponent extends Component {
  render() {
    return (
      <div>
        <Header as="h1">
          Fish Tracker
          <Header as="h3">Track your catches to find patterns</Header>
        </Header>
      </div>
    );
  }
}

export default HeaderComponent;
