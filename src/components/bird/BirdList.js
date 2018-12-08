import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import BirdCard from "./BirdCard";
// import BirdRadio from "./BirdRadio"

export default class BirdList extends Component {
  state = {
    birds: [],
    type:""
  };

  getAllBirds = (search) =>  {
    const newState = {};

    APIManager.getAllEntries("birds", `?type=${search}`)
      .then(birds => {
        this.setState({ birds: birds });
      })

      .then(() => this.setState(newState));
  }

  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  

  render () {
    return (
      <React.Fragment>
        <div className="bird-header">
          <h2 className="page-title">Birds</h2>
          {/* <BirdRadio */}
          <input className="bird-search" 
          placeholder="Bird Type"
          id="type"
          onChange={this.handleFieldChange} />
          <button onClick={() => {
            this.getAllBirds(this.state.type)
          }}
          
          />
        </div>
        <section className="birds">
          <div className="card__holder">
            {this.state.birds.map(bird => (
              <BirdCard
                key={bird.id}
                bird={bird}
                birds={this.state.birds}
              />
            ))}
          </div>
        </section>
      </React.Fragment>
    )
  }

}