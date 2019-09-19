import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class Fish extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  toggleEditFishes = e => {
    this.setState({ toggleEdit: "true" });
  };
  render() {
    return (
      <tr key={this.props.fishes.pk_fish}>
        <td>
          <div>{this.props.fishes.pk_fish}</div>
        </td>
        <td>
          <div contentEditable={this.state.toggleEdit}>
            {this.props.fishes.fish_name}
          </div>
        </td>
        <td>
          <div contentEditable={this.state.toggleEdit}>
            {this.props.fishes.catch_date}
          </div>
        </td>
        <td>
          <div contentEditable={this.state.toggleEdit}>
            {this.props.fishes.fish_weight}
          </div>
        </td>
        <td>
          <Button
            value={this.props.fishes.pk_fish}
            onClick={this.toggleEditFishes}
          >
            EDIT
          </Button>
          <Button
            value={this.props.fishes.pk_fish}
            onClick={this.props.removefishes}
          >
            DELETE
          </Button>
        </td>
      </tr>
    );
  }
}
export default Fish;
