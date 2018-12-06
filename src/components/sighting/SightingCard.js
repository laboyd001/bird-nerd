import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';
import "./Sighting.css";

export default class SightingCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sighting-card" key={this.props.sighting.id}>
          <p>{this.props.sighting.date}</p>
          <p>{this.props.sighting.location}</p>
          <p>{this.props.sighting.bird.name}</p>
          <p>{this.props.sighting.summary}</p>
        
        <ButtonGroup className="card-button">
        <Button
              type="button"
              className="btn"
            >
              Edit
            </Button>
            <Button
              type="button"
              onClick={() => this.props.deleteSighting(this.props.sighting.id)}
              className="btn"
            >
              Delete
            </Button>
        </ButtonGroup>
        </div>
      </React.Fragment>
    );
  }
}


