import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import SightingList from "./sighting/SightingList";
import BirdList from "./bird/BirdList";
import BirdMap from "./map/BirdMap"
import NavBar from "./nav/NavBar";
import Welcome from './authentication/Welcome'

//This is the main controller for the app before the user gets routed to either sightings, birds, or maps
export default class ApplicationViews extends Component {
  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)


  // function to grab user credentials from local or session storage
  getCurrentUser = () => {
    const currentUser = +sessionStorage.getItem("userId") || +localStorage.getItem("userId")
    return currentUser
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Route
          exact
          path="/"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <SightingList
                  {...props}
                  getCurrentUser={this.getCurrentUser}
                />
              );
            } else {
              return <Redirect to="/welcome" />;
            }
          }}
        />
        <Route
          exact
          path="/birds"
          render={props => {
            if (this.isAuthenticated()) {
            return (
            <BirdList />
            );
           } else {
             return <Redirect to="/welcome" />;
           }
         }}
       />
       <Route
          exact
          path="/map"
          render={props => {
            if (this.isAuthenticated()) {
            return (
            <BirdMap
            getCurrentUser={this.getCurrentUser}
            />
            );
           } else {
             return <Redirect to="/welcome" />;
           }
         }}
       />
       <Route path="/welcome" render={props => {
          return (
            <Welcome getCurrentUser={this.getCurrentUser} {...props} />)
        }} />
      </React.Fragment>
    );
  }
}
