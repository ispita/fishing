import React, { Component } from "react";
import { Table, Input, Button } from "semantic-ui-react";
import Edit from "./subcomponents/Edit";
import Delete from "./subcomponents/Delete";

class FishingTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fishes: [],

      fish_name: "",
      catch_date: "",
      fish_weight: ""
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

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
  };

  render() {
    let fishes = this.state.fishes.map(fishes => {
      return (
        <tr key={fishes.pk_fish}>
          <td>{fishes.pk_fish}</td>
          <td>{fishes.fish_name}</td>
          <td>{fishes.catch_date}</td>
          <td>{fishes.fish_weight}</td>
          <Edit />
          <Delete />
        </tr>
      );
    });
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
          <tbody>{fishes}</tbody>
        </Table>
      </div>
    );
  }
}
export default FishingTable;
