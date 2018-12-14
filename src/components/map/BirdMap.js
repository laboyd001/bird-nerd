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

    // The navigator.geolocation.getCurrentPosition function grabs the location from the user's computer it's then setting the state to the variable of userLocation
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

    // grab all the bird sightings and filter them to the current user and expand to bird so we can see the bird name
    APIManager.getAllEntries("sightings", `?user_id=${this.state.currentUserId}&_expand=bird`)
      .then(sightings => {
        this.setState({ sightings: sightings});
      })
      .then(() => this.setState(newState));
  }
  
  // onMarkerClick we are settign the state so we know which marker is active and which one is selected.  This is going to help us add details to the infowindow based on the marker we select
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  // onMapClick is going to pop open the infowindow box
  onMapClick = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  // below is where we render the map.  We're giving it some style as well (size, window centering)
  // initialCenter is accessing the userLocation variable we set above, zoom is how far in or out we would like to see the map
  // To render multiple markers I'm mapping over the sightings and plotting a marker for each sighting. I also gave them some attributes that will be passed to the infowindow
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
          <div>
            <h4 className="marker-info">{this.state.selectedPlace.name}</h4>
            <h6 className="marker-info">{this.state.selectedPlace.bird}</h6>
            <p className="marker-info">{this.state.selectedPlace.summary}</p>
          </div>  
         
        </InfoWindow>
      </Map>
    );
  }
}

// this googleapiwrapper is helping to manage my API credentials which I've tucked away in another file.
export default GoogleApiWrapper({
    apiKey:(process.env.REACT_APP_API_KEY_Google)
})(BirdMap)