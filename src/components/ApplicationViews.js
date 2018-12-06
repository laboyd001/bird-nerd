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
    date: "",
    location: "",
    birdId: "",
    summary: ""
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
