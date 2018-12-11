import React, { Component } from 'react';
import ApplicationViews from "./ApplicationViews"
import './BirdNerd.css';

console.log("test",process.env.REACT_APP_API_KEY_Google)
export default class BirdNerd extends Component {
  isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)


  render() {
    return (
      <React.Fragment>
        <ApplicationViews
        isAuthenticated={this.isAuthenticated}
        />
      </React.Fragment>
    );
  }
}

