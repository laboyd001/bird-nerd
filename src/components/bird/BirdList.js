import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import BirdCard from "./BirdCard";

export default class BirdList extends Component {
  state = {
    users: [],
    birds: []
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAllEntries("birds")
      .then(birds => {
        this.setState({ birds: birds });
      })

      .then(() => this.setState(newState));
  }

  render () {
    return (
      <React.Fragment>
        <h2 className="page-title">Birds</h2>
        <section className="birds">
          <div className="card__holder">
            {this.state.birds.map(bird => (
              <BirdCard
                key={bird.id}
                bird={bird}
                birds={this.state.birds}
              />
            ))}
          </div>
        </section>
      </React.Fragment>
    )
  }

}