import React, { Component } from "react";
import "./Bird.css";

export default class BirdCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="bird-card" key={this.props.bird.id}>
          <div className="bird-image">
            <img src={this.props.bird.image} className="bird-image" alt={this.props.bird.name}></img>
          </div>
          <div className="bird-details">
            <p>Name: {this.props.bird.name}</p>
            <p>Sex: {this.props.bird.sex}</p>
            <p>Description: {this.props.bird.description}</p>
            <p>Color: {this.props.bird.color}</p>
            <p>Type: {this.props.bird.type}</p>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
