import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

export default class BirdRadio extends Component {
  constructor (props) {
    super(props);

    this.state = { rSelected: [] };

    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
  }

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  render() {
    return (
      <div>
        <h5>Select Bird Type:</h5>
        <ButtonGroup>
          <Button color="danger" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>SongBird</Button>
          <Button color="danger" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Bird of Prey</Button>
          <Button color="danger" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>ShoreBird</Button>
          <Button color="danger" onClick={() => this.onRadioBtnClick(4)} active={this.state.rSelected === 4}>Waterfowl</Button>
        </ButtonGroup>
        <p>Selected: {this.state.rSelected}</p>

      </div>
    );
  }
}

