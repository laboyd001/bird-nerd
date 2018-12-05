import React, { Component } from "react";
import "./Sighting.css";

export default class SightingCard extends Component {
  render() {
    return (
      <React.Fragment>
        <h1> I 'm the sighting card</h1> 
        <div className="sighting__card" key={this.props.sighting.id}>
          <p>{this.props.sighting.date}</p>
          <p>{this.props.sighting.location}</p>
          <p>{this.props.sighting.bird}</p>
          <p>{this.props.sighting.summary}</p>
        </div>
      </React.Fragment>
    );
  }
}
