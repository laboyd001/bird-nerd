import React, { Component } from "react";
import { CardText, CardBody,
  CardTitle, CardSubtitle, Container } from 'reactstrap';
import "./Bird.css";

export default class BirdCard extends Component {
  render() {
    return (
      <React.Fragment>
        <Container>
        
        <div className="bird-card" key={this.props.bird.id}>
          <CardBody>
            <div className="bird-image">
              <img src={this.props.bird.image} className="bird-image" alt={this.props.bird.name}></img>
            </div>
          </CardBody>
          <CardBody>
            <div className="bird-details">
              <CardTitle>
                {this.props.bird.name}
              </CardTitle>
              <CardSubtitle>
                {this.props.bird.type}
              </CardSubtitle>
              <br></br>
              <CardSubtitle>
                Description:
              </CardSubtitle>
              <CardText>
                {this.props.bird.description}
              </CardText>
            </div>
          </CardBody>
        </div>
        </Container>
      </React.Fragment>
    );
  }
}
