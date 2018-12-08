import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import SightingCard from "./SightingCard";
import SightingModal from "../sighting/SightingModal";

export default class SightingList extends Component {
  state = {
    birds: [],
    sightings: [],
    users: [],
    currentUserId: this.props.getCurrentUser(),
    userName: "",
    editDate: "",
    editLocation: "",
    editBirdId: "",
    editSummary: "",
    editId: ""
  };


  componentDidMount() {
    const newState = {};
    APIManager.getAllEntries("birds").then(birds => {
      this.setState({ birds: birds });
    });

    APIManager.getAllEntries(
      "sightings",
      `?user_id=${this.state.currentUserId}&_sort=date&_order=asc&_expand=bird`
    ).then(sightings => {
      this.setState({ sightings: sightings });
    });

    APIManager.getEntry("users", this.state.currentUserId)
      .then(user => {
        this.setState({ userName: user.name });
      })

      .then(() => this.setState(newState));
  }

  addSighting = sighting => {
    return APIManager.addEntry("sightings", sighting)
      .then(() =>
        APIManager.getAllEntries(
          "sightings",
          `?user_id=${
            this.state.currentUserId
          }&_sort=date&_order=asc&_expand=bird`
        )
      )
      .then(sightings =>
        this.setState({
          sightings: sightings
        })
      );
  };

  deleteSighting = id =>
    APIManager.deleteEntry("sightings", id)
      .then(() =>
        APIManager.getAllEntries(
          "sightings",
          `?user_id=${
            this.state.currentUserId
          }&_sort=date&_order=asc&_expand=bird`
        )
      )
      .then(sightings =>
        this.setState({
          sightings: sightings
        })
      );

  editSighting = (editId, editSighting) =>
    APIManager.editEntry("sightings", editId, editSighting)
      .then(() =>
        APIManager.getAllEntries(
          "sightings",
          `?user_id=${
            this.state.currentUserId
          }&_sort=date&_order=asc&_expand=bird`
        )
      )
      .then(sightings =>
        this.setState({
          sightings: sightings
        })
      );

  handleEditClick = (
    editDate,
    editLocation,
    editBirdId,
    editSummary,
    editId
  ) => {
    this.setState({
      editDate: editDate,
      editLocation: editLocation,
      editBirdId: editBirdId,
      editSummary: editSummary,
      editId: editId
    });
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewSighting = () => {
    if (this.state.bird === "") {
      window.alert("Please select a bird");
    } else {
      const sighting = {
        date: this.state.date,
        location: this.state.location,
        birdId: this.state.birds.find(b => b.name === this.state.birdId).id,
        summary: this.state.summary,
        user_id: +this.state.currentUserId
      };
      console.log("sighting", sighting);
      this.addSighting(sighting);
    }
  };

  constructEditedSighting = () => {
    const conditionBird = typeof this.state.editBirdId === "number";
    const editSighting = {
      date: this.state.editDate,
      location: this.state.editLocation,
      birdId: conditionBird
        ? this.state.editBirdId
        : this.state.birds.find(b => b.name === this.state.editBirdId).id,
      summary: this.state.editSummary,
      id: this.state.editId
    };
    console.log("edit sighting", editSighting);

    this.editSighting(editSighting.id, editSighting);
  };

  render() {
    return (
      <React.Fragment>
        <div className="sighting-header">
          <h2 className="page-title">Sightings</h2>
          <SightingModal
            birds={this.state.birds}
            sightings={this.state.sightings}
            handleFieldChange={this.handleFieldChange}
            constructNewSighting={this.constructNewSighting}
          />
        </div>
        <section className="sightings">
          <div className="card-holder">
            {this.state.sightings.map(sighting => (
              <SightingCard
                key={sighting.id}
                sighting={sighting}
                sightings={this.state.sightings}
                birds={this.state.birds}
                deleteSighting={this.deleteSighting}
                handleEditClick={this.handleEditClick}
                handleFieldChange={this.handleFieldChange}
                constructEditedSighting={this.constructEditedSighting}
              />
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
