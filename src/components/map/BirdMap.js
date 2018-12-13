import React from 'react';
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';
import APIManager from '../../modules/APIManager'



class BirdMap extends React.Component {
    state = {
      sightings:[],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      currentUserId: this.props.getCurrentUser(),
      userLocation: {lat: 36.184568, lng: -86.647630},
      loading:true
    }


  componentDidMount() {
    const newState = {};

    navigator.geolocation.getCurrentPosition(
      position=> {
        const {latitude, longitude} = position.coords;

        this.setState({
          userLocation: {lat: latitude, lng: longitude}, 
          loading: false
        });
      },
      ()=> {
        this.setState({loading:false})
      }
    )

    APIManager.getAllEntries("sightings", `?user_id=${this.state.currentUserId}&_expand=bird`)
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
    const  {loading, userLocation} = this.state;
    const style = {
      width: '90vw',
      height: '90vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }

    if(loading) {
      return null;
    }
   
    return (
      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick = { this.onMapClick }
        zoom = { 10 }
        initialCenter = {userLocation}
      
      >
        {this.state.sightings.map(item => (
            <Marker
              key={item.id}
              onClick = { this.onMarkerClick }
              title={item.bird.name}
              name={item.location}
              summary={item.summary}
              bird={item.bird.name}
              birdImage={item.bird.image}
              position={{ lat: item.lat, lng: item.lng }}
            />
          ))}
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
            <h4 className="marker-info">{this.state.selectedPlace.name}</h4>
            <h6 className="marker-info">{this.state.selectedPlace.bird}</h6>
            <p className="marker-info">{this.state.selectedPlace.summary}</p>
            <img src={this.state.selectedPlace.birdImage} alt={this.state.selectedPlace.name} className="birdMap-image"/>
         
        </InfoWindow>
      </Map>
    );
  }
}
export default GoogleApiWrapper({
    apiKey:(process.env.REACT_APP_API_KEY_Google)
})(BirdMap)