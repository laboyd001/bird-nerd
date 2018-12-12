import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';
import "./Sighting.css";
import SightingEdit from "./SightingEdit";
import Moment from 'react-moment';
import BirdCard from '../bird/BirdCard'

export default class SightingCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sighting-card" key={this.props.sighting.id}>
          <div className="sighting-nobird">
          <h5>Date:<br></br></h5>
          <p>
          <Moment format="MMMM Do YYYY">
          {this.props.sighting.date}
          </Moment>
          </p>
          <h5>Location:<br></br></h5>
          <p>{this.props.sighting.location}</p>
          <h5>Bird:<br></br></h5>
          <p>{this.props.sighting.bird.name}</p>
          <h5>Summary:<br></br></h5>
          <p>{this.props.sighting.summary}</p>
        
        
        
        <ButtonGroup className="card-button">
            <SightingEdit
              birds={this.props.birds}
              sighting={this.props.sighting}
              handleEditClick={this.props.handleEditClick}
              handleFieldChange={this.props.handleFieldChange}
              constructEditedSighting={this.props.constructEditedSighting}
            />
            <Button
              type="button"
              onClick={() => this.props.deleteSighting(this.props.sighting.id)}
              className="btn"
            >
              Delete
            </Button>
        </ButtonGroup>
        </div>
        <section className="birds">
          <div className="card__holder">
            {this.props.birds
            .filter(bird=>bird.id=== this.props.sighting.birdId)
            
            .map(bird => (
              <BirdCard key={bird.id} bird={bird} birds={this.props.birds} />
            ))}
          </div>
        </section>

        </div>
      </React.Fragment>
    );
  }
}


