import React, { Component } from 'react';
import ApplicationViews from "./ApplicationViews"
import './BirdNerd.css';

export default class BirdNerd extends Component {
  isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)


  render() {
    return (
      <React.Fragment>
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

