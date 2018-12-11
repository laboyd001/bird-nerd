import React, { Component } from "react";
import { Button, ButtonGroup } from 'reactstrap';
import "./Sighting.css";
import SightingEdit from "./SightingEdit";
import Moment from 'react-moment';

export default class SightingCard extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="sighting-card" key={this.props.sighting.id}>
          <h5>Date:</h5><br></br>
          {/* <p>Date:<br></br> */}
          <p>
          <Moment format="MMMM Do YYYY">
          {this.props.sighting.date}
          </Moment>
          </p>
          <p>Location:<br></br>{this.props.sighting.location}</p>
          <p>Bird:<br></br>{this.props.sighting.bird.name}</p>
          <p>Summary:<br></br>{this.props.sighting.summary}</p>
        
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
      </React.Fragment>
    );
  }
}


