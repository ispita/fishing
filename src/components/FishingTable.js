import React, { Component } from "react";
import { Table, Input, Button } from "semantic-ui-react";
import Edit from "./subcomponents/Edit";
import Delete from "./subcomponents/Delete";
import Fish from "./subcomponents/Fish";

class FishingTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fishes: [],

      fish_name: "",
      catch_date: "",
      fish_weight: "",
      pk_fish: ""
    };
  }
  componentDidMount() {
    this.getfishes();
  }
  getfishes = _ => {
    fetch("http://192.168.1.147:3001/posts")
      .then(response => response.json())
      .then(response => this.setState({ fishes: response.data }))
      .catch(err => console.error(err));
  };

  addfishes = _ => {
    fetch(
      `http://192.168.1.147:3001/posts/add?fish_name=${this.state.fish_name}&catch_date=${this.state.catch_date}&fish_weight=${this.state.fish_weight}`
    )
      .then(this.getfishes)
      .catch(err => console.error(err));
    this.setState({ fish_name: "" });
    this.setState({ catch_date: "" });
    this.setState({ fish_weight: "" });
  };

  removefishes = e => {
    this.setState({ pk_fish: e.target.value }, () => {
      fetch(
        `http://192.168.1.147:3001/posts/remove?pk_fish=${this.state.pk_fish}`
      ).then(this.getfishes);
    });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="App">
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
        <Table>
          <thead>
            <tr>
              <th>Fish ID</th>
              <th>Fish Name</th>
              <th>Catch Date</th>
              <th>Fish Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.fishes.map(fish => (
              <Fish
                fishes={fish}
                toggleEditFishes={this.toggleEditFishes}
                removefishes={this.removefishes}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default FishingTable;
