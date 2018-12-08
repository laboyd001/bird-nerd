import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import APIManager from "../../modules/APIManager"

export default class BirdRadio extends Component {
  constructor (props) {
    super(props);

    this.state = { rSelected: []};

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
    APIManager.getAllEntries(
      "birds",
      `?type=${rSelected}`
    ).then(birds => {
      this.setState({ birds: birds });
      console.log("bird type", rSelected )
    });
  }

  render() {
    return (
      <div>
        <h5>Select Bird Type:</h5>
        <ButtonGroup>
          <Button color="danger" onClick={() => this.onRadioBtnClick("Songbird")} active={this.state.rSelected === "Songbird"}>SongBird</Button>
          <Button color="danger" onClick={() => this.onRadioBtnClick("Bird of Prey")} active={this.state.rSelected === "Bird of Prey"}>Bird of Prey</Button>
          <Button color="danger" onClick={() => this.onRadioBtnClick("shorebird")} active={this.state.rSelected === "shorebird"}>ShoreBird</Button>
          <Button color="danger" onClick={() => this.onRadioBtnClick("waterfowl")} active={this.state.rSelected === "waterfowl"}>Waterfowl</Button>
        </ButtonGroup>
        <p>Selected: {this.state.rSelected}</p>

      </div>
    );
  }
}

