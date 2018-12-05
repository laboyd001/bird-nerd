import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import SightingCard from "./SightingCard";

export default class SightingList extends Component {
  state = {
    users: [],
    sightings: [],
    birds: []
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAllEntries("sightings", `?_sort=date&_order=asc`)
      .then(sightings => {
        this.setState({ sightings: sightings });
      })

      .then(() => this.setState(newState));
  }

  render() {
    return (
      <React.Fragment>
        <h2>Sightings</h2>
        <section className="sightings">
          <div className="card__holder">
            {this.state.sightings.map(sighting => (
              <SightingCard
                key={sighting.id}
                sighting={sighting}
                sightings={this.state.sightings}
              />
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
