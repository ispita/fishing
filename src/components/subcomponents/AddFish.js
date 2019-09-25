import React, { Component } from "react";
import { Input, Button } from "semantic-ui-react";

class AddFish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fish_name: "",
      catch_date: "",
      fish_weight: ""
    };
  }
  addfishes = _ => {
    fetch(
      `http://192.168.1.147:3001/posts/add?fish_name=${this.state.fish_name}&catch_date=${this.state.catch_date}&fish_weight=${this.state.fish_weight}`
    )
      .then(this.props.getfishes)
      .catch(err => console.error(err));
    this.setState({ fish_name: "" });
    this.setState({ catch_date: "" });
    this.setState({ fish_weight: "" });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name);
  };
  render() {
    return (
      <div>
        <Input
          placeholder="Enter a Fish Specie"
          value={this.state.fish_name}
          name="fish_name"
          onChange={this.handleChange}
        />
        <Input
          placeholder="Enter a Catch Date"
          value={this.state.catch_date}
          name="catch_date"
          onChange={this.handleChange}
        />
        <Input
          placeholder="Enter a Fish Weight"
          value={this.state.fish_weight}
          name="fish_weight"
          onChange={this.handleChange}
        />
        <Button onClick={this.addfishes}>ADD FISH</Button>
      </div>
    );
  }
}
export default AddFish;
