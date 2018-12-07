import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import SightingList from "./sighting/SightingList";
import BirdList from "./bird/BirdList";
import APIManager from "../modules/APIManager";
import NavBar from './nav/NavBar';

// import SightingCard from './sighting/SightingCard'

export default class ApplicationViews extends Component {
  state = {
    birds:[],
    sightings:[],
    // date: "",
    // location: "",
    // birdId: "",
    // summary: "",
    editDate: "",
    editLocation:"",
    editBirdId:"",
    editSummary:"",
    editId:""
  }

  componentDidMount() {
    const newState = {};
    APIManager.getAllEntries("birds")
      .then(birds => {
        this.setState({ birds: birds });
      })

      APIManager.getAllEntries(
        "sightings",
        "?_sort=date&_order=asc&_expand=bird"
      )
        .then(sightings => {
          this.setState({ sightings: sightings });
        })

      .then(() => this.setState(newState));

  }

  addSighting = sighting => {
    return APIManager.addEntry("sightings", sighting)
      .then(() =>
        APIManager.getAllEntries("sightings",
        "?_sort=date&_order=asc&_expand=bird"
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
          "?_sort=date&_order=asc&_expand=bird"
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
        "?_sort=date&_order=asc&_expand=bird"
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
  }

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
        summary: this.state.summary
      };
      console.log("sighting", sighting);
      this.addSighting(sighting)
    }}

  constructEditedSighting = () => {
    const conditionBird = typeof this.state.editBirdId === "number";
    const editSighting = {
      date: this.state.editDate,
      location: this.state.editLocation,
      birdId: conditionBird
      ? this.state.editBirdId
      :this.state.birds.find(b => b.name === this.state.editBirdId).id,
      summary: this.state.editSummary,
      id: this.state.editId
    };
    console.log("edit sighting", editSighting);

    this.editSighting(editSighting.id, editSighting);
  };

  render() {
    return (
      <React.Fragment>
        <NavBar
        birds={this.state.birds}
        sightings={this.state.sightings}
        handleFieldChange={this.handleFieldChange}
        constructNewSighting={this.constructNewSighting}
        />
        <Route
          exact
          path="/"
          render={props => {
            return <SightingList
            {...props}
            birds={this.state.birds}
            sightings={this.state.sightings}
            deleteSighting={this.deleteSighting}
            handleEditClick={this.handleEditClick}
            handleFieldChange={this.handleFieldChange}
            constructEditedSighting={this.constructEditedSighting}
          />;
          }}
        />
        <Route
          exact
          path="/birds"
          render={props => {
            return <BirdList />;
          }}
        />
      </React.Fragment>
    );
  }
}
