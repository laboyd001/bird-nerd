import React, { Component } from "react";
import { Button, ButtonGroup, Card, CardText, CardBody,
  CardTitle, CardSubtitle, Container } from 'reactstrap';
import "./Sighting.css";
import SightingEdit from "./SightingEdit";
import Moment from 'react-moment';
import BirdCard from '../bird/BirdCard'

export default class SightingCard extends Component {
  render() {
    return (
      <Container>
      <Card className="sighting-card">
        <CardBody>
          {/* <CardTitle>
          {this.props.sighting.bird.name}
          </CardTitle> */}
          <CardTitle>
            {this.props.sighting.location}
          </CardTitle>
          <CardSubtitle>
            <Moment format="MMMM Do YYYY">
              {this.props.sighting.date}
            </Moment>
          </CardSubtitle>
        </CardBody>
        <CardBody>
            {this.props.birds
            .filter(bird=>bird.id=== this.props.sighting.birdId)
            
            .map(bird => (
              <BirdCard key={bird.id} bird={bird} birds={this.props.birds} />
            ))}
        </CardBody>
        <CardBody>
          <CardSubtitle>
            Sighting Summary:
          </CardSubtitle>
          <CardText>
            {this.props.sighting.summary}
          </CardText>
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
        </CardBody>
      </Card>
    </Container>




    );
  }
}


