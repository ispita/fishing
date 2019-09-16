import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";

class App extends Component {
  state = {
    fish: []
  };

  test

  componentDidMount() {
    this.getFish();
  }
  getFish = _ => {
    fetch("http://192.168.1.147:3001/posts")
      .then(response => response.json())
      .then(response => this.setState({ fish: response.data }))
      .catch(err => console.error(err));
  };

  render() {
    let fish = this.state.fish.map(fish => {
      return (
        <tr key={fish.pk_fish}>
          <td>{fish.pk_fish}</td>
          <td>{fish.fish_name}</td>
          <td>{fish.catch_date}</td>
          <td>{fish.fish_weight}</td>
          <Button>EDIT</Button>
          <Button>DELETE</Button>
        </tr>
      );
    });
    return (
      <div className="App">
        <Table>
          <thead>
            <tr>
              <th>FISH ID</th>
              <th>Fish Name</th>
              <th>Catch Date</th>
              <th>Fish Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{fish}</tbody>
        </Table>
      </div>
    );
  }
}

export default App;
