import React, { Component } from "react";
import { Table, Sidebar, Button, Segment } from "semantic-ui-react";
import Fish from "./subcomponents/Fish";
import AddFish from "./subcomponents/AddFish";

class FishingTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fishes: [],
      visible: false,
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
  toggleVisibility = () =>
    this.setState(prevState => ({ visible: !prevState.visible }));
  render() {
    return (
      <div className="App">
        <Button
          content={this.state.visible ? "Hide" : "Add Fish"}
          onClick={this.toggleVisibility}
        />
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            animation="scale down"
            icon="labeled"
            inverted
            vertical
            visible={this.state.visible}
            width="150px"
          >
            <AddFish getfishes={this.getfishes} />
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic>
              <Table celled>
                <Table.Header>
                  <tr>
                    <th>Fish ID</th>
                    <th>Fish Name</th>
                    <th>Catch Date</th>
                    <th>Fish Weight</th>
                    <th>Fish Length</th>
                    <th>Actions</th>
                  </tr>
                </Table.Header>
                <tbody>
                  {this.state.fishes.map(fish => (
                    <Fish
                      key={fish.pk_fish}
                      fishes={fish}
                      getfishes={this.getfishes}
                    />
                  ))}
                </tbody>
              </Table>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
export default FishingTable;
