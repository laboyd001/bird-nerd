import React, { Component } from "react";
import "./Sighting.css";

export default class SightingForm extends Component {

  state = {
    date: "",
    location: "",
    bird: "",
    summary: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewSighting = evt => {
    // evt.preventDefault();
    if (this.state.bird === "") {
      window.alert("Please select a bird");
    } else {
      const sighting = {
        date: this.state.date,
        location: this.state.location,
        birdId: this.props.birds.find(
          b => b.name === this.state.bird
        ).id
      };

      // Create the animal and redirect user to animal list
      this.props
        .APIManager.addEntry("sightings", sighting)
        .then(() => this.props.history.push("/sightings"));
    }
  };


render() {
  return (
    <React.Fragment>
      <div className="new__sighting__form">
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Sighting Date
            </span>
          </div>
            <input
              type="date"
              className="form-control"
              onChange={this.handleFieldChange}
              id="date"
              placeholder="Sighting Date"
            />
          </div>
        <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Sighting Location
          </span>
        </div>
          <input
            type="text"
            className="form-control"
            onChange={this.handleFieldChange}
            id="location"
            placeholder="Sighting Location"
          />
        </div>
        
        <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Bird Sighted
          </span>
        </div>
          <select
            defaultValue=""
            name="bird"
            id="bird"
            onChange={this.handleFieldChange}
          >
            <option value="">Select a Bird</option>
            {this.props.birds.map(b => (
              <option key={b.id} id={b.id}>
                {b.name}
              </option>
            ))}
          </select>
        </div>
        <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text" id="basic-addon1">
            Sighting Summary
          </span>
        </div>
          <input
            type="text"
            className="form-control"
            onChange={this.handleFieldChange}
            id="summary"
            placeholder="Sighting Summary"
          />
        </div>
        <button
          onClick={this.constructNewSighting}
          className="btn btn-primary"
        >
        Save
        </button>
      </div>
    </React.Fragment>
  );
}

}
