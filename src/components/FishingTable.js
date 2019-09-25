import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import Fish from "./subcomponents/Fish";
import AddFish from "./subcomponents/AddFish";

class FishingTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fishes: [],

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

  render() {
    return (
      <div className="App">
        <AddFish getfishes={this.getfishes} />
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
                key={fish.pk_fish}
                fishes={fish}
                toggleEditFishes={this.toggleEditFishes}
                getfishes={this.getfishes}
              />
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
export default FishingTable;
