import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import SightingList from "./sighting/SightingList";
import BirdList from "./bird/BirdList";
import BirdMap from "./map/BirdMap"
import APIManager from "../modules/APIManager";
import NavBar from "./nav/NavBar";
import Welcome from './authentication/Welcome'

// import SightingCard from './sighting/SightingCard'

export default class ApplicationViews extends Component {
  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  getAllUsers = () => APIManager.getAllEntries("users")

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
                  getAllUsers={this.getAllUsers}
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
            <BirdMap />
            );
           } else {
             return <Redirect to="/welcome" />;
           }
         }}
       />
       <Route path="/welcome" render={props => {
          return (
            <Welcome getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser} {...props} />)
        }} />
      </React.Fragment>
    );
  }
}
