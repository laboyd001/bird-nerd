import React, { Component } from "react";
import SightingCard from "./SightingCard";

export default class SightingList extends Component {
  state = {
    users: [],
    // birdName: ""
  };

  render() {
    return (
      <React.Fragment>
        <h2 className="page-title">Sightings</h2>
        <section className="sightings">
          <div className="card-holder">
            {this.props.sightings.map(sighting => (
              <SightingCard
                key={sighting.id}
                sighting={sighting}
                sightings={this.props.sightings}
                birds={this.props.birds}
                deleteSighting={this.props.deleteSighting}
                // birdName={this.state.birdName}
                // editSighting={this.props.editSighting}
                handleEditClick={this.props.handleEditClick}
                handleFieldChange={this.props.handleFieldChange}
                constructEditedSighting={this.props.constructEditedSighting}

              />
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
