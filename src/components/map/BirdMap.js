import React, { Component } from 'react';
import GoogleMaps from "simple-react-google-maps"
import APIManager from "../../modules/APIManager"
// import Geocode from "react-geocode";

export default class BirdMap extends Component {

  state = {
    sightings: []
  }

  componentDidMount() {
    const newState = {};

    APIManager.getAllEntries("sightings")
      .then(sightings => {
        this.setState({ sightings: sightings});
      })
      .then(() => this.setState(newState));
  }

  
  

  getLocations() {
    const locations = (this.state.sightings.map(place => 
      place.location))
      console.log("locations", locations)
  }
  
  

  render() {
    this.getLocations()
    return (
       <GoogleMaps
        apiKey = {"AIzaSyBoPPKuvvE0W8dwOfm87Qd3m2RxZTwmHmo"}
        style={{height: "900px", width: "100%"}}
        zoom={10}
        center={{lat: 36.184568, lng: -86.647630}}
        markers={
          [
          {lat: 36.203893, lng: -86.677757}
          ]
        }
       />
    );
  }
}


