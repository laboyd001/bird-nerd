import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import APIManager from '../../modules/APIManager'



class BirdMap extends React.Component {
    state = {
      sightings:[],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }

  componentDidMount() {
    const newState = {};

    APIManager.getAllEntries("sightings")
      .then(sightings => {
        this.setState({ sightings: sightings});
      })
      .then(() => this.setState(newState));
  }
  
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  render() {
    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 10 }
        initialCenter = {{ lat: 36.184568, lng: -86.647630 }}
      >
        {this.state.sightings.map(item => (
            <Marker
              key={item.id}
              onClick = { this.onMarkerClick }
              title={item.location}
              name={item.location}
              position={{ lat: item.lat, lng: item.lng }}
            />
          ))}
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
        <p>{this.state.sightings.birdId}</p> 
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey:"AIzaSyBoPPKuvvE0W8dwOfm87Qd3m2RxZTwmHmo"
})(BirdMap)