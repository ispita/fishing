import React, { Component } from "react";
import { Button } from "semantic-ui-react";

class Fish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleEdit: false,
      editButton: "EDIT",
      deleteButton: true,
      editColor: "grey",
      bgcolor: "",
      fish_name: this.props.fishes.fish_name,
      catch_date: this.props.fishes.catch_date,
      fish_weight: this.props.fishes.fish_weight,
      fish_length: this.props.fishes.fish_length
    };
  }

  removefishes = e => {
    this.setState({ pk_fish: e.target.value }, () => {
      fetch(
        `http://192.168.1.147:3001/posts/remove?pk_fish=${this.props.fishes.pk_fish}`
      ).then(this.props.getfishes);
    });
  };

  cancel = e => {
    console.log("canceled");
    this.setState(
      (prevState, prevProps) => ({
        toggleEdit: !prevState.toggleEdit,
        deleteButton: !prevState.deleteButton,

        editButton: "EDIT",
        editColor: "grey",
        bgcolor: "white"
      }),
      () => {
        this.setState({
          fish_name: this.props.fishes.fish_name,
          catch_date: this.props.fishes.catch_date,
          fish_weight: this.props.fishes.fish_weight,
          fish_length: this.props.fishes.fish_length
        });
      }
    );
  };

  toggleEditFishes = e => {
    this.setState(prevState => ({
      toggleEdit: !prevState.toggleEdit,
      deleteButton: !prevState.deleteButton
    }));
    if (this.state.editButton === "EDIT") {
      this.setState({
        editButton: "SAVE",
        editColor: "green",
        bgcolor: "lightgrey"
      });
    } else {
      fetch(
        `http://192.168.1.147:3001/posts/edit?fish_name=${this.state.fish_name}&catch_date=${this.state.catch_date}&fish_weight=${this.state.fish_weight}&fish_length=${this.state.fish_length}&pk_fish=${this.props.fishes.pk_fish}`
      ).then(
        this.setState({
          editButton: "EDIT",
          editColor: "grey",
          bgcolor: "white"
        })
      );
    }
  };
  handleChange = e => {
    this.setState({ [e.target.getAttribute("name")]: e.target.innerText });
  };

  render() {
    return (
      <tr
        key={this.props.fishes.pk_fish}
        bgcolor={this.state.bgcolor}
        name="fishrow"
      >
        <td>
          <div>{this.props.fishes.pk_fish}</div>
        </td>
        <td name="fish_name">
          <div
            suppressContentEditableWarning={true}
            name="fish_name"
            contentEditable={this.state.toggleEdit}
            onBlur={this.handleChange}
          >
            {this.state.fish_name}
          </div>
        </td>
        <td>
          <div
            suppressContentEditableWarning={true}
            name="catch_date"
            contentEditable={this.state.toggleEdit}
            onBlur={this.handleChange}
          >
            {this.state.catch_date}
          </div>
        </td>
        <td>
          <div
            suppressContentEditableWarning={true}
            name="fish_weight"
            contentEditable={this.state.toggleEdit}
            onBlur={this.handleChange}
          >
            {this.state.fish_weight}
          </div>
        </td>
        <td>
          <div
            suppressContentEditableWarning={true}
            name="fish_length"
            contentEditable={this.state.toggleEdit}
            onBlur={this.handleChange}
          >
            {this.state.fish_length}
          </div>
        </td>
        <td>
          <Button
            color={this.state.editColor}
            value={this.props.fishes.pk_fish}
            onClick={this.toggleEditFishes}
          >
            {this.state.editButton}
          </Button>
          {this.state.deleteButton == true ? (
            <Button
              color="red"
              value={this.props.fishes.pk_fish}
              onClick={this.removefishes}
            >
              DELETE
            </Button>
          ) : (
            <Button
              color="red"
              value={this.props.fishes.pk_fish}
              onClick={this.cancel}
            >
              CANCEL
            </Button>
          )}
        </td>
      </tr>
    );
  }
}
export default Fish;
