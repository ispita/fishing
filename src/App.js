import React, { Fragment, Component } from "react";
import FishingTable from "./components/FishingTable";
import AddFish from "./components/subcomponents/AddFish";

class App extends Component {
  render() {
    return (
      <Fragment>
        <FishingTable />
      </Fragment>
    );
  }
}

export default App;
