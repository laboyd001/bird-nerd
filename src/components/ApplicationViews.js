import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import SightingList from "./sighting/SightingList";
import BirdList from "./bird/BirdList";
import APIManager from "../modules/APIManager";

// import SightingCard from './sighting/SightingCard'

export default class ApplicationViews extends Component {
  state = {
    birds:[],
    sightings:[]
  }

  componentDidMount() {
    APIManager.getAllEntries("birds")
      .then(birds => {
        this.setState({ birds: birds });
      })

  }

  addSighting = sighting => {
    return APIManager.addEntry("sightings", sighting)
      .then(() =>
        APIManager.getAllEntries("sightings")
      )
      .then(sightings =>
        this.setState({
          sightings: sightings
        })
      );
  };

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <SightingList
            {...props}
            birds={this.state.birds}
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
