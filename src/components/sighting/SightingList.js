import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import SightingCard from "./SightingCard";
import SightingModal from "../sighting/SightingModal";
import Geocode from "react-geocode";
// import BirdSearch from './BirdSearch'


export default class SightingList extends Component {
  state = {
    birds: [],
    sightings: [],
    users: [],
    currentUserId: this.props.getCurrentUser(),
    userName: "",
    editDate: "",
    editLocation: "",
    editBirdId: "",
    editSummary: "",
    editId: "",
    editLat:"",
    editLng:"",
    lat: "",
    lng: ""
  };

  componentDidMount() {
    const newState = {};
    APIManager.getAllEntries("birds").then(birds => {
      this.setState({ birds: birds });
    });

    APIManager.getAllEntries(
      "sightings",
      `?user_id=${this.state.currentUserId}&_sort=date&_order=desc&_expand=bird`
    ).then(sightings => {
      this.setState({ sightings: sightings });
    });

    APIManager.getEntry("users", this.state.currentUserId)
      .then(user => {
        this.setState({ userName: user.name });
      })
      .then(() => this.setState(newState));
  }

  addSighting = sighting => {
    return APIManager.addEntry("sightings", sighting)
      .then(() =>
        APIManager.getAllEntries(
          "sightings",
          `?user_id=${
            this.state.currentUserId
          }&_sort=date&_order=desc&_expand=bird`
        )
      )
      .then(sightings =>
        this.setState({
          sightings: sightings
        })
      );
  };

  deleteSighting = id =>
    APIManager.deleteEntry("sightings", id)
      .then(() =>
        APIManager.getAllEntries(
          "sightings",
          `?user_id=${
            this.state.currentUserId
          }&_sort=date&_order=desc&_expand=bird`
        )
      )
      .then(sightings =>
        this.setState({
          sightings: sightings
        })
      );

  editSighting = (editId, editSighting) =>
    APIManager.editEntry("sightings", editId, editSighting)
      .then(() =>
        APIManager.getAllEntries(
          "sightings",
          `?user_id=${
            this.state.currentUserId
          }&_sort=date&_order=desc&_expand=bird`
        )
      )
      .then(sightings =>
        this.setState({
          sightings: sightings
        })
      );

  handleEditClick = (
    editDate,
    editLocation,
    editBirdId,
    editSummary,
    editLat,
    editLng,
    editId
  ) => {
    this.setState({
      editDate: editDate,
      editLocation: editLocation,
      editBirdId: editBirdId,
      editSummary: editSummary,
      editLat: editLat,
      editLng: editLng,
      editId: editId
    });
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewSighting = () => {
    if (this.state.bird === "") {
      window.alert("Please select a bird");
    } else {
      this.geocodeLocation();
    }
  };

  geocodeLocation = () => {
    Geocode.setApiKey(process.env.REACT_APP_API_KEY_Google);

    Geocode.fromAddress(this.state.location).then(
      response => {
        const latitude = response.results[0].geometry.location.lat;
        const longitude = response.results[0].geometry.location.lng;
        this.setState({ lat: latitude, lng: longitude });
        let sighting = {
          date: this.state.date,
          location: this.state.location,
          birdId: this.state.birds.find(b => b.name === this.state.birdId).id,
          summary: this.state.summary,
          lat: this.state.lat,
          lng: this.state.lng,
          user_id: +this.state.currentUserId
        };
        this.addSighting(sighting);
      },
      error => {
        console.error(error);
      }
    );
  };

  constructEditedSighting = () => {
    Geocode.setApiKey(process.env.REACT_APP_API_KEY_Google);
    const conditionBird = typeof this.state.editBirdId === "number";
    Geocode.fromAddress(this.state.editLocation).then(response => {
      const latitude = response.results[0].geometry.location.lat;
      const longitude = response.results[0].geometry.location.lng;
      this.setState({ editLat: latitude, editLng: longitude });
      const editSighting = {
        date: this.state.editDate,
        location: this.state.editLocation,
        birdId: conditionBird
          ? this.state.editBirdId
          : this.state.birds.find(b => b.name === this.state.editBirdId).id,
        summary: this.state.editSummary,
        lat: this.state.editLat,
        lng: this.state.editLng,
        id: this.state.editId
      };
      console.log("lat", this.state.editLat)
      console.log("edit sighting", editSighting);
      this.editSighting(editSighting.id, editSighting);
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="sighting-header">
          <h2 className="page-title">Sightings</h2>

             

          <SightingModal
            birds={this.state.birds}
            sightings={this.state.sightings}
            handleFieldChange={this.handleFieldChange}
            constructNewSighting={this.constructNewSighting}
            geocodeLocation={this.geocodeLocation}
          />
        </div>
        <section className="sightings">
          <div className="card-holder">
            {this.state.sightings.map(sighting => (
              <SightingCard
                key={sighting.id}
                sighting={sighting}
                sightings={this.state.sightings}
                birds={this.state.birds}
                deleteSighting={this.deleteSighting}
                handleEditClick={this.handleEditClick}
                handleFieldChange={this.handleFieldChange}
                constructEditedSighting={this.constructEditedSighting}
              />
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
