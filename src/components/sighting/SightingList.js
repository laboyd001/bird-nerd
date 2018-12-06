import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import SightingCard from "./SightingCard";

export default class SightingList extends Component {
  state = {
    users: [],
    // birdName: ""
  };

  render() {
    return (
      <React.Fragment>
        <h2>Sightings</h2>
        <section className="sightings">
          <div className="card__holder">
            {this.props.sightings.map(sighting => (
              <SightingCard
                key={sighting.id}
                sighting={sighting}
                sightings={this.props.sightings}
                birds={this.props.birds}
                deleteSighting={this.props.deleteSighting}
                // birdName={this.state.birdName}
                editSighting={this.props.editSighting}
                handleEditClick={this.props.handleEditClick}
                constructEditedSighting={this.props.constructEditedSighting}

              />
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
