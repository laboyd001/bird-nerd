import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import BirdCard from "./BirdCard";

export default class BirdList extends Component {
  state = {
    birds: [],
    type: "",
    color: "",
    hideSelector: false
  };

  // when the page loads all the birds are displayed and sorted asc alphabetically.
  componentDidMount() {
    const newState = {};

    APIManager.getAllEntries("birds", "?_sort=name&_order=asc")
      .then(birds => {
        this.setState({ birds: birds });
      })
      .then(() => this.setState(newState));
  }

  // this handler exists so I can hide the color selector until a type is selected.  Only then is the user able to select color.
  handleChangeSelect = () => {
    const currentState = this.state.hideSelector;
    this.setState({ hideSelector: !currentState });
  };

  // this function exists so there are no duplicate bird types in the dropdown selector
  getUniqueType() {
    const birds = this.state.birds;
    const typeSelection = [...new Set(birds.map(item => item.type))];
    // console.log("type", typeSelection);
    return typeSelection.map((type, index) => (
      <option key={index}>{type}</option>
    ));
  }

  // this function exists so there are no duplicate bird colors in the dropdown selector
  getUniqueColor() {
    const birds = this.state.birds;
    const colorSelection = [...new Set(birds.map(item => item.color))];
    // console.log("color", colorSelection);
    return colorSelection.map((color, index) => (
      <option key={index}>{color}</option>
    ));
  }

  // this function only displays the birds with the bird type the user has selected
  getBirdType = type => {
    const newState = {};

    APIManager.getAllEntries("birds", `?type=${type}&_sort=name&_order=asc`)
      .then(birds => {
        this.setState({ birds: birds });
      })

      .then(() => this.setState(newState));
  };

  // this function only displays the birds with the bird type and color the user has selected
  getBirdColor = (color, type) => {
    const newState = {};

    APIManager.getAllEntries(
      "birds",
      `?color=${color}&type=${type}&_sort=name&_order=asc`
    )
      .then(birds => {
        this.setState({ birds: birds });
      })

      .then(() => this.setState(newState));
  };

  // this function gets all the birds again I call it when the user hits the clear button
  getAllBirds = () => {
    const newState = {};

    APIManager.getAllEntries("birds", "?_sort=name&_order=asc")
      .then(birds => {
        this.setState({ birds: birds });
      })

      .then(() => this.setState(newState));
  };

  // this is for the dropdown selections...  it changes the state from empty string to whatever the user selects
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // below we render the bird list and selectors. The .map method iterates over all the birds in the DB and renders the cards
  render() {
    const birdType = this.getUniqueType();
    const birdColor = this.getUniqueColor();
    return (
      <React.Fragment>
        <div className="bird-header">
          <h2 className="page-title">Birds</h2>
          <div className="bird-selector">
            <div className="bird-type">
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Bird Type
                  </span>
                </div>
                <select
                  defaultValue=""
                  name="birdType"
                  id="type"
                  onChange={this.handleFieldChange}
                >
                  <option value="">Select a Bird Type</option>
                  {birdType}
                </select>
                <button
                  onClick={() => {
                    this.getBirdType(this.state.type);
                    this.handleChangeSelect();
                  }}
                >
                  Choose
                </button>
                <button
                  onClick={() => {
                    this.getAllBirds();
                    this.handleChangeSelect();
                  }}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className={this.state.hideSelector ? "bird-color" :"hide"}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    Bird Color
                  </span>
                </div>
                <select
                  defaultValue=""
                  name="birdColor"
                  id="color"
                  onChange={this.handleFieldChange}
                >
                  <option value="">Select a Bird Color</option>
                  {birdColor}
                </select>
                <button
                  onClick={() => {
                    this.getBirdColor(this.state.color, this.state.type);
                  }}
                >
                  Choose
                </button>
                <button
                  onClick={() => {
                    this.getAllBirds();
                    this.handleChangeSelect();
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
        <section className="birds">
          <div className="card__holder">
            {this.state.birds.map(bird => (
              <BirdCard key={bird.id} bird={bird} birds={this.state.birds} />
            ))}
          </div>
        </section>
      </React.Fragment>
    );
  }
}
