import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';



class GoogleMapsContainer extends React.Component {
    state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
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
        <Marker
          onClick = { this.onMarkerClick }
          title = { 'My place' }
          position = {{ lat: 36.203893, lng: -86.677757 }}
          name = { 'My Place' }
        />
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
        <p>You Are Here</p> 
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey:"AIzaSyBoPPKuvvE0W8dwOfm87Qd3m2RxZTwmHmo"
})(GoogleMapsContainer)