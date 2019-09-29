import React, { Component } from "react";
import { Input, Button, Sidebar, Segment } from "semantic-ui-react";
import { DateInput } from "semantic-ui-calendar-react";

class AddFish extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fish_name: "",
      catch_date: "",
      fish_weight: "",
      fish_length: ""
    };
  }
  addfishes = _ => {
    fetch(
      `http://192.168.1.147:3001/posts/add?fish_name=${this.state.fish_name}&catch_date=${this.state.catch_date}&fish_weight=${this.state.fish_weight}&fish_length=${this.state.fish_length}`
    )
      .then(this.props.getfishes)
      .catch(err => console.error(err));
    this.setState({ fish_name: "" });
    this.setState({ catch_date: "" });
    this.setState({ fish_weight: "" });
    this.setState({ fish_length: "" });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.name);
  };
  handleDateChange = (e, { name, value }) => {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <div>
        <DateInput
          size="small"
          name="catch_date"
          dateFormat="MM-DD-YYYY"
          placeholder="Date"
          value={this.state.catch_date}
          clearable={true}
          closable={true}
          iconPosition="left"
          onChange={this.handleDateChange}
        />
        <form>
          <Input
            placeholder="Enter a Fish Specie"
            value={this.state.fish_name}
            name="fish_name"
            onChange={this.handleChange}
          />
          <Input
            placeholder="Enter a Fish Weight"
            value={this.state.fish_weight}
            name="fish_weight"
            onChange={this.handleChange}
          />
          <Input
            placeholder="Enter a Fish Length"
            value={this.state.fish_length}
            name="fish_length"
            onChange={this.handleChange}
          />
          <br></br>
        </form>
        <Button onClick={this.addfishes}>SAVE NEW FISH</Button>
      </div>
    );
  }
}
export default AddFish;
