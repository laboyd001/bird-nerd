import React, { Component } from "react";
import "./Bird.css";

export default class BirdCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="bird__card" key={this.props.bird.id}>
          <img src={this.props.bird.image} className="bird_image" alt={this.props.bird.name}></img>
          <p>{this.props.bird.name}</p>
          <p>{this.props.bird.sex}</p>
          <p>{this.props.bird.description}</p>
          <p>{this.props.bird.color}</p>
          <p>{this.props.bird.type}</p>
        </div>
      </React.Fragment>
    );
  }
}
