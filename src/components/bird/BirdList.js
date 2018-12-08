import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import BirdCard from "./BirdCard";
// import BirdRadio from "./BirdRadio"

export default class BirdList extends Component {
  state = {
    birds: [],
    type: ""
  };

  componentDidMount() {
    const newState = {};

    APIManager.getAllEntries("birds")
      .then(birds => {
        this.setState({ birds: birds });
      })

      .then(() => this.setState(newState));
  }

  getBirdType = search => {
    const newState = {};

    APIManager.getAllEntries("birds", `?type=${search}`)
      .then(birds => {
        this.setState({ birds: birds });
      })

      .then(() => this.setState(newState));
  };

  getAllBirds = () => {
    const newState = {};

    APIManager.getAllEntries("birds")
      .then(birds => {
        this.setState({ birds: birds });
      })

      .then(() => this.setState(newState));
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  render() {
    return (
      <React.Fragment>
        <div className="bird-header">
          <h2 className="page-title">Birds</h2>
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
              {this.state.birds.map(b => (
                <option key={b.id} id={b.id}>
                  {b.type}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                this.getBirdType(this.state.type);
              }}
            >
              Choose
            </button>
            <button
              onClick={() => {
                this.getAllBirds();
              }}
            >
              Clear
            </button>
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
