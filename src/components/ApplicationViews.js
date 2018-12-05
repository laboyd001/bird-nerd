import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import SightingList from "./sighting/SightingList";
import SightingForm from "./sighting/SightingForm";
import BirdList from "./bird/BirdList";
import APIManager from "../modules/APIManager";

// import SightingCard from './sighting/SightingCard'

export default class ApplicationViews extends Component {
  state = {
    birds:[]
  }

  componentDidMount() {
    const newState = {};

    APIManager.getAllEntries("birds")
      .then(birds => {
        this.setState({ birds: birds });
      })

      .then(() => this.setState(newState));
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <SightingList />;
          }}
        />
        <Route
          exact
          path="/birds"
          render={props => {
            return <BirdList />;
          }}
        />
        <Route
          path="/sightings/new"
          render={props => {
            return (
              <SightingForm
                {...props}
                addAnimal={this.addAnimal}
                birds={this.state.birds}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
