import React, { Component } from 'react';
import NavBar from "./nav/NavBar"
import ApplicationViews from "./ApplicationViews"
import './BirdNerd.css';

export default class BirdNerd extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

