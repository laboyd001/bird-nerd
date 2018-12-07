import React, { Component } from "react";
import SightingCard from "./SightingCard";
import APIManager from "../../modules/APIManager";

export default class SightingList extends Component {
  state = {
    users: [],
    currentUserId: this.props.getCurrentUser(),
    userName:""
  };

  componentDidMount () {
    const newState = {};
    APIManager.getEntry("users", this.state.currentUserId)
    .then((user)=>{
      this.setState({ userName: user.name})
    })

    APIManager.getAllEntries("sightings", `?user_id=${this.state.currentUserId}&_sort=date&_order=asc&_expand=bird`)
      .then(sightings => {
        this.setState({ sightings: sightings });
      })

    .then(() => this.setState(newState))
  }

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
